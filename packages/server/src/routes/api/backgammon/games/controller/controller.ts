import asyncParser from '@shared/asyncParser';
import { Socket } from '@connection/socket';
import { Controller, RouterType } from '@routes/api/shared/controller';
import { withCatch } from '@routes/api/shared/middleware';
import {
    EmitBrokenPointRound,
    EmitCollectPointRound,
    EmitRound,
    EmitSignInUser,
    EmitUndoRound,
    EVENTS,
    Game,
    OPPONENT,
    PLAYERS,
    Round,
} from '@shared-types/backgammon';
import { layout } from '../constants';
import { GamesService } from '../service';
import {
    brokenPointCalculator,
    calculateGameOver,
    calculateSkipRound,
    calculateStageOver,
    collectPointCalculator,
    roundCalculator,
    shouldSkipRound,
    undoRoundCalculator,
    calculateMars,
} from './calculators';
import { rollDices } from './calculators/utils';
import {
    GameNotFoundError,
    InvalidDiceError,
    InvalidTriangleError,
} from '@shared/error';
import { OK, CREATED } from 'http-status-codes';

type GameParam = { id: string };

export default class GamesController extends Controller {
    private _namespace: SocketIO.Namespace;
    private _socket!: SocketIO.Socket;

    constructor(
        _io: Socket,
        router: RouterType,
        private _gamesService: GamesService
    ) {
        super(router, '/games');
        this._namespace = _io.of('/socket/backgammon');
        this._namespace.on('connection', this._handleSocket.bind(this));

        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.get(this.path, this._getGames);
        this.router.post(this.path, this._createGame);
        this.router.get(this.path + '/:id', this._getGame);
        this.router.put(this.path + '/:id', this._updateGame);
        // this.router.delete(this.path + '/:id', this._deleteGame);
    };

    private _getGames = withCatch<any, Game[]>(async (req, res) => {
        const games = await this._gamesService.readGames();

        res.status(OK).json(games);
    });

    private _getGame = withCatch<GameParam, Game>(async (req, res) => {
        const { id } = req.params;

        const game = await this._gamesService.readGame(parseInt(id));

        res.send(game);
    });

    private _createGame = withCatch<
        any,
        Game,
        Parameters<GamesService['createGame']>[0]
    >(async (req, res) => {
        const { players, stages } = req.body;

        const game = await this._gamesService.createGame({ players, stages });

        res.status(CREATED).json(game);
    });

    private _updateGame = withCatch<GameParam, Game, Pick<Game, 'players'>>(
        async (req, res) => {
            const { params, body } = req;
            const { id } = params;
            const blackPlayerIndex = PLAYERS.BLACK;
            const black = body.players[blackPlayerIndex];

            const game = await this._gamesService.readGame(parseInt(id));
            game.players[blackPlayerIndex] = black;

            const uptGame = await this._gamesService.updateGame(game);

            res.send(uptGame);
        }
    );

    private async _handleSocket(socket: SocketIO.Socket) {
        console.log('client connected');
        this._socket = socket;

        socket.on(EVENTS.JOIN_ROOM, this._handleRoom.bind(this));
    }

    private async _handleRoom(roomName: string) {
        try {
            this._socket.join(roomName);
            const roomSocket = this._socket.to(roomName);
            const game = await this._gamesService.readGame(parseInt(roomName));
            this._emitGameUpdate(game);

            /* USER EVENTS */
            roomSocket.on(EVENTS.SIGN_IN_USER, this._signInUser.bind(this));

            /* ROUND EVENTS */
            roomSocket.on(EVENTS.ROUND, this._handleRoundCalculate.bind(this));
            roomSocket.on(
                EVENTS.BROKEN_POINT_ROUND,
                this._handleBrokenPoint.bind(this)
            );
            roomSocket.on(
                EVENTS.COLLECT_POINT_ROUND,
                this._handleCollectPoint.bind(this)
            );
            roomSocket.on(EVENTS.UNDO_ROUND, this._handleUndoRound.bind(this));
        } catch (error) {
            if (error instanceof GameNotFoundError)
                this._emitRoomEvent(roomName, EVENTS.ERROR, error.payload);
            else
                this._emitRoomEvent(
                    roomName,
                    EVENTS.BAD_REQUEST,
                    error.message
                );
        }
    }

    private async _signInUser(data: EmitSignInUser) {
        const { id, players } = data;

        const game = await this._gamesService.readGame(id);
        game.players = Object.assign(game.players, players);
        this._emitGameUpdate(game);
    }

    private _emitGameUpdate(game: Game) {
        this._emitRoomEvent(game.id.toString(), EVENTS.GAME_UPDATE, game);

        const shouldGameStart =
            game.players[PLAYERS.BLACK] > 0 &&
            game.players[PLAYERS.WHITE] > 0 &&
            game.rounds.length < 1;

        if (shouldGameStart) this._initializeRound(game);
        // this._namespace.to(game.id.toString()).emit(EVENTS.GAME_UPDATE, game);
    }

    private async _initializeRound(_game: Game, player = PLAYERS.WHITE) {
        const brokens = { [PLAYERS.BLACK]: 0, [PLAYERS.WHITE]: 0 };
        const _round: Parameters<GamesService['createRound']>[0] = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            player,
            brokens,
            collected: brokens,
            layout,
        };
        const round = await this._gamesService.createRound(_round);
        _game.rounds.push(round);
        const game = await this._gamesService.updateGame(_game);
        this._emitRoomEvent(game.id.toString(), EVENTS.ROUND, round);
    }

    private async _handleRoundCalculate(data: EmitRound) {
        try {
            const { gameId, roundId } = data;
            const lastRound = await this._gamesService.readRound(
                gameId,
                roundId
            );
            const _lastRound = await asyncParser(lastRound);
            const nextRound = await roundCalculator(data, _lastRound);
            await this._gamesService.updateRounds(gameId, nextRound);

            this._handleNextRound(gameId.toString(), nextRound);
        } catch (error) {
            const gameId = data.gameId;
            const roomName = data.gameId.toString();
            if (
                error instanceof InvalidDiceError ||
                error instanceof InvalidTriangleError
            ) {
                this._emitRoomEvent(roomName, EVENTS.ERROR, error.payload);
                setTimeout(() => {
                    this._replaceRound(gameId);
                }, 1500);
            } else
                this._emitRoomEvent(
                    roomName,
                    EVENTS.BAD_REQUEST,
                    error.message
                );
        }
    }

    private async _replaceRound(gameId: Game['id']) {
        const game = await this._gamesService.readGame(gameId);
        const rounds = game.rounds;
        const lastRound = rounds[rounds.length - 1];

        this._emitRoomEvent(gameId.toString(), EVENTS.ROUND, lastRound);
    }

    private async _handleBrokenPoint(data: EmitBrokenPointRound) {
        const { gameId, roundId } = data;
        const lastRound = await this._gamesService.readRound(gameId, roundId);
        const _lastRound = await asyncParser(lastRound);
        const nextRound = await brokenPointCalculator(data, _lastRound);
        await this._gamesService.updateRounds(gameId, nextRound);

        this._handleNextRound(gameId.toString(), nextRound);
    }

    private async _handleCollectPoint(data: EmitCollectPointRound) {
        const { gameId, roundId } = data;
        const lastRound = await this._gamesService.readRound(gameId, roundId);
        const _lastRound = await asyncParser(lastRound);
        const nextRound = await collectPointCalculator(data, _lastRound);

        const roomName = gameId.toString();
        if (shouldSkipRound(nextRound)) {
            this._emitRoomEvent(roomName, nextRound.event, nextRound.round);
        } else {
            await this._gamesService.updateRounds(gameId, nextRound);

            this._handleNextRound(roomName, nextRound);
        }
    }

    private async _handleNextRound(roomName: string, round: Round) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const socket = this._namespace.to(roomName);

        const [shouldStageOver, shouldSkipRound] = await Promise.all([
            calculateStageOver(round),
            calculateSkipRound(round),
        ]);

        if (shouldStageOver) {
            const { winner } = shouldStageOver;
            const game = await this._gamesService.readGame(parseInt(roomName));
            const shouldMars = await calculateMars(winner, round.collected);
            const winnerPoint = shouldMars ? 2 : 1;
            game.score[winner] += winnerPoint;

            const [shouldGameOver] = await Promise.all([
                calculateGameOver(game.stages, game.score),
                this._gamesService.updateGame(game),
            ]);

            if (shouldGameOver) {
                await this._gamesService.deleteGame(game.id);
                socket.emit(EVENTS.GAME_OVER, shouldStageOver);
            } else {
                socket.emit(EVENTS.STAGE_OVER, shouldStageOver);
                game.rounds = [];

                setTimeout(async function reHandleNextRound() {
                    await self._gamesService.updateGame(game);

                    self._initializeRound(game, winner);
                }, 1500);
            }
        } else if (shouldSkipRound) {
            socket.emit(EVENTS.SKIP_ROUND, {
                round,
                message: 'You can not move. Skipping to next round.',
            });

            setTimeout(async function reHandleNextRound() {
                round.player = OPPONENT[round.player];
                round.turn += 1;
                round.dice = await rollDices();

                self._handleNextRound(roomName, round);
            }, 1500);
        } else {
            // Send round.
            socket.emit(EVENTS.ROUND, round);
        }
    }

    private async _handleUndoRound(data: EmitUndoRound) {
        const { gameId } = data;
        const game = await this._gamesService.readGame(gameId);
        const _game = await asyncParser(game);
        const rounds = await undoRoundCalculator(_game.rounds);
        _game.rounds = rounds;
        await this._gamesService.updateGame(_game);

        this._emitRoomEvent(_game.id.toString(), EVENTS.UNDO_ROUND, rounds);
    }

    private _emitRoomEvent<P>(roomName: string, event: EVENTS, payload: P) {
        this._namespace.to(roomName).emit(event, payload);
    }
}
