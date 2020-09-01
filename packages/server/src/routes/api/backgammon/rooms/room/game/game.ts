import { layout } from '@routes/api/backgammon/games/constants';
import {
    EmitBase,
    EmitRound,
    EmitScore,
    GameServerSide,
    OPPONENT,
    PLAYERS,
} from '@shared-types/backgammon';
import {
    NOTIFY_DURATION,
    ONE_SECOND,
    SHORT_TIMER,
} from '@shared-types/constants';
import { EmitGame, GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import { InvalidDiceError, InvalidTriangleError } from '@shared/error';
import { fetchUser, validateUser } from '../utils';
import {
    calculateGameOver,
    calculateMars,
    calculateSkipRound,
    calculateStageOver,
    findRoundById,
    generatePlayersObj,
    verifyRoundPlayer,
} from './helpers';
import { Round } from './round';

type User = Exclude<
    GameServerSide['players'][keyof GameServerSide['players']],
    null
>;

const EMIT_GAME_KEYS: (keyof EmitGame)[] = [
    'duration',
    'id',
    'players',
    'rounds',
    'score',
    'stages',
    'timer',
];

export default class BackgammonGame implements GameServerSide {
    players: GameServerSide['players'];
    score: GameServerSide['score'];
    stages: GameServerSide['stages'];
    duration: GameServerSide['duration'];
    timer: GameServerSide['timer'];
    rounds: Round[];

    private _t?: GameServerSide['rounds'][number]['player'];
    private _tRef?: NodeJS.Timeout;
    private _namespace: SocketIO.Namespace;
    private _connectedUsers: Map<string, User>;
    private _status: 'UNINITIALIZED' | 'INITIALIZED' | 'OVER';

    constructor(
        public id: number,
        private _roomId: number,
        _io: SocketIO.Server,
        disconnectCb: (id: number) => void
    ) {
        this.players = generatePlayersObj(null, null);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];

        this._connectedUsers = new Map();
        this._status = 'UNINITIALIZED';

        this._namespace = _io.of(generateBackgammonGamePath(this._roomId, id));
        this._namespace.use(this._authMiddleware.bind(this));
        this._namespace.on(
            'connection',
            this._handleClientConnection.call(this, disconnectCb)
        );
    }

    private async _authMiddleware(
        socket: SocketIO.Socket,
        next: (err?: any) => void
    ) {
        const clientId = socket.client.id;
        const userId = socket.handshake.query.userId;

        const response = await fetchUser(userId);
        const user = response?.data?.getUser;
        if (validateUser(user)) {
            let userExistWithDifferentId = false;

            const users = this._connectedUsers.values();
            for (const _user of users) {
                if (_user?.id === user.id) {
                    userExistWithDifferentId = true;
                    break;
                }
            }

            if (!userExistWithDifferentId)
                this._connectedUsers.set(clientId, user);

            next();
        } else next(new Error('User does not exist.'));
    }

    private _handleClientConnection(disconnectCb: (id: number) => void) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return function _onClientConnection(socket: SocketIO.Socket) {
            const clientId = socket.client.id;
            const gameUninitialized = self._status === 'UNINITIALIZED';
            const shouldInitialize = Boolean(
                gameUninitialized &&
                    self.players[PLAYERS.BLACK] &&
                    self.players[PLAYERS.WHITE]
            );

            socket.emit(
                GAME_EVENTS.JOIN_GAME,
                EMIT_GAME_KEYS.reduce((game, key) => {
                    game[key] = self[key];
                    return game;
                }, {} as Record<keyof EmitGame, EmitGame[keyof EmitGame]>)
            );

            if (shouldInitialize) self._initializeGame();

            socket.on(
                GAME_EVENTS.ROUND,
                self._withBreakTimer(self._handleRoundCalculate).bind(self)
            );

            // Disconnect event
            socket.on(
                'disconnect',
                self._handleDisconnect.call(
                    self,
                    clientId,
                    socket,
                    disconnectCb
                )
            );
        };
    }

    private _handleDisconnect(
        clientId: string,
        socket: SocketIO.Socket,
        disconnectCb: (arg0: number) => void
    ) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return function onDisconnect() {
            const connectedUsers = self._connectedUsers;

            if (connectedUsers.has(clientId)) {
                const user = connectedUsers.get(clientId) as User;
                const userId = user.id;
                const userName = user.name;

                const wasPlayer = self._checkIsPlayer(userId);

                // Delete client from the users list.
                connectedUsers.delete(clientId);

                // Broadcast disconnected client.
                socket.broadcast.emit(GAME_EVENTS.DISCONNECT_USER, userName);

                // If disconnected user was one of the players...
                if (wasPlayer) {
                    // Delete the player.
                    self._deletePlayer(userId);

                    // Notify the game users.
                    socket.broadcast.emit(
                        GAME_EVENTS.DISCONNECT_PLAYER,
                        self.players
                    );

                    // Notify the room users.
                    disconnectCb(self.id);
                }
            }
        };
    }

    private _checkIsPlayer(userId: string) {
        const players = this.players;

        return (
            players[PLAYERS.BLACK]?.id === userId ||
            players[PLAYERS.WHITE]?.id === userId
        );
    }

    private _deletePlayer(userId: User['id']) {
        const players = this.players;

        if (players[PLAYERS.BLACK]?.id === userId)
            players[PLAYERS.BLACK] = null;
        else if (players[PLAYERS.WHITE]?.id === userId)
            players[PLAYERS.WHITE] = null;
    }

    /*
     * * * * * *
     * * * * * *
     *
     * GAME LOGICS
     *
     * * * * * *
     * * * * * *
     */

    private _initializeGame(roundPlayer: Round['player'] = PLAYERS.WHITE) {
        this._status = 'INITIALIZED';
        this.rounds = [];
        this._initializeRound(roundPlayer);
    }

    private _initializeRound(roundPlayer: Round['player']) {
        const brokens = generatePlayersObj(0, 0);
        const collected = generatePlayersObj(0, 0);
        const round = new Round(0, 1, roundPlayer, brokens, collected, layout);
        this._emitNextRound(round);
    }

    private async _handleRoundCalculate(data: EmitRound) {
        try {
            const { roundId } = data;
            const latestRound = await findRoundById(roundId, this.rounds);
            const result = await latestRound.calculate(data);

            const { brokens, dice, layout } = result;
            const shouldJumpToNextRound = dice.length < 1;

            const nextRoundPlayer = shouldJumpToNextRound
                ? OPPONENT[latestRound.player]
                : latestRound.player;
            const nextRoundDice = shouldJumpToNextRound ? undefined : dice;

            const nextRound = new Round(
                1,
                latestRound.turn + 1,
                nextRoundPlayer,
                brokens,
                latestRound.collected,
                layout,
                nextRoundDice
            );
            this._handleNextRound(nextRound);
            this._emitNextRound(nextRound);
        } catch (error) {
            if (
                error instanceof InvalidDiceError ||
                error instanceof InvalidTriangleError
            ) {
                this._emitNamespace(GAME_EVENTS.ERROR, error.payload);
                setTimeout(() => {
                    this._emitNamespace(
                        GAME_EVENTS.ROUND,
                        this.rounds[this.rounds.length - 1]
                    );
                }, NOTIFY_DURATION);
            } else this._emitNamespace(GAME_EVENTS.BAD_REQUEST, error.message);
        }
    }

    private async _handleNextRound(round: Round) {
        const [shouldStageOver, shouldSkipRound] = await Promise.all([
            calculateStageOver(round),
            calculateSkipRound(round),
        ]);

        if (shouldStageOver) {
            const { winner } = shouldStageOver;
            const shouldMars = await calculateMars(winner, round.collected);
            const winnerPoint = shouldMars ? 2 : 1;
            this.score[winner] += winnerPoint;

            const shouldGameOver = await calculateGameOver(
                this.stages,
                this.score
            );

            if (shouldGameOver) {
                // TODO
                // this._handleGameOver(roomName, game.id, shouldStageOver);
            } else {
                const payload = shouldStageOver as EmitScore;
                payload.score = this.score;
                payload.stages = this.stages;
                this._emitNamespace(GAME_EVENTS.STAGE_OVER, payload);

                setTimeout(() => {
                    this._initializeGame(winner);
                }, NOTIFY_DURATION);
            }
        } else if (shouldSkipRound) {
            this._emitNamespace(GAME_EVENTS.SKIP_ROUND, {
                round,
                message: 'You can not move. Skipping to next round.',
            });

            setTimeout(() => {
                this._handleNextRound(
                    new Round(
                        0,
                        round.turn + 1,
                        OPPONENT[round.player],
                        round.brokens,
                        round.collected,
                        round.layout
                    )
                );
            }, NOTIFY_DURATION);
        } else {
            // Send round.
            this._emitNamespace(GAME_EVENTS.ROUND, round);
        }
    }

    /*
     * * * * * *
     * * * * * *
     *
     * UTILITIES
     *
     * * * * * *
     * * * * * *
     */

    private _emitNextRound(round: Round) {
        this.rounds.push(round);
        this._emitNamespace(GAME_EVENTS.ROUND, round);
    }

    private _emitNamespace<P>(event: string, payload: P) {
        this._namespace.emit(event, payload);

        if (event === GAME_EVENTS.ROUND) this._handleTimer();
    }

    private async _handleTimer() {
        const latestRound = this.rounds[this.rounds.length - 1];
        this._t = latestRound.player;

        this._recursivelySetShortTimer(latestRound.player);
    }

    private async _recursivelySetShortTimer(
        latestRoundPlayer: PLAYERS | undefined,
        seconds = SHORT_TIMER
    ) {
        const roundPlayer = this._t;

        if (
            roundPlayer === latestRoundPlayer &&
            verifyRoundPlayer(roundPlayer)
        ) {
            seconds -= 1;
            this._emitNamespace(GAME_EVENTS.SHORT_TIMER, seconds);

            if (seconds < 1) {
                this._recursivelySetTimer(latestRoundPlayer);
            } else {
                this._tRef = setTimeout(() => {
                    this._recursivelySetShortTimer(latestRoundPlayer, seconds);
                }, ONE_SECOND);
            }
        }
    }

    private async _recursivelySetTimer(latestRoundPlayer: PLAYERS | undefined) {
        const roundPlayer = this._t;

        if (
            roundPlayer === latestRoundPlayer &&
            verifyRoundPlayer(roundPlayer)
        ) {
            this.timer[roundPlayer] -= 1;

            if (this.timer[roundPlayer] < 1) {
                // Exit loop on game over.
                const winner = OPPONENT[roundPlayer];
                // TODO
                // this._handleGameOver(roomName, gameId, { winner });
            } else {
                this._emitNamespace(GAME_EVENTS.TIMER, this.timer);

                this._tRef = setTimeout(() => {
                    this._recursivelySetTimer(latestRoundPlayer);
                }, ONE_SECOND);
            }
        }
    }

    private _withBreakTimer<Data extends EmitBase>(
        eventHandler: (data: Data) => unknown
    ) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return async function breakTimer(data: Data) {
            // Break timer
            self._tRef && clearTimeout(self._tRef);
            delete self._t;

            return eventHandler.call(self, data);
        };
    }
}
