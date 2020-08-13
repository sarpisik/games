import asyncParser from '@shared/asyncParser';
import { Socket } from 'src/connection/socket';
import { Controller, RouterType } from 'src/routes/api/shared/controller';
import { withCatch } from 'src/routes/api/shared/middleware';
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
} from 'types/lib/backgammon';
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
} from './calculators';
import { rollDices } from './calculators/utils';

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
        this._namespace = _io.of('/backgammon');
        this._namespace.on('connection', this._handleSocket.bind(this));

        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.post(this.path, this._createGame);
        this.router.get(this.path + '/:id', this._getGame);
        this.router.put(this.path + '/:id', this._updateGame);
        // this.router.delete(this.path + '/:id', this._deleteGame);
    };

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

        res.send(game);
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
        this._socket.join(roomName);
        const roomSocket = this._socket.to(roomName);

        const game = await this._gamesService.readGame(parseInt(roomName));
        this._emitGameUpdate(game);

        roomSocket.on(EVENTS.SIGN_IN_USER, this._signInUser.bind(this));
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
        const { gameId, roundId } = data;
        const lastRound = await this._gamesService.readRound(gameId, roundId);
        const _lastRound = await asyncParser(lastRound);
        const nextRound = await roundCalculator(data, _lastRound);
        await this._gamesService.updateRounds(gameId, nextRound);

        this._handleNextRound(gameId.toString(), nextRound);
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
            game.score[winner] += 1;

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
