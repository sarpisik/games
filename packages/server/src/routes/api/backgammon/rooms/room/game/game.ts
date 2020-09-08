import { GameServerSide, PLAYERS } from '@shared-types/backgammon';
import { EmitGame, GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import logger from '@shared/Logger';
import { UserApi } from '@shared/userApi';
import { SocketConnection } from '../../shared/socketConnection';
import { reduceGameProps } from './helpers';
import {
    emitNamespace,
    emitNextRound,
    handleBrokenPoint,
    handleCollectPoint,
    handleDisconnect,
    handleGameOver,
    handleNextRound,
    handlePlayerDisconnect,
    handlePlayersScore,
    handleRoundCalculate,
    handleRoundResult,
    handleTimer,
    handleUndoRound,
    initializeGame,
    initializeRound,
    recursivelySetShortTimer,
    recursivelySetTimer,
    resetGame,
    undoRound,
    updatePlayerScore,
    withBreakTimer,
} from './methods';
import { Round } from './round';

/*
 * TODO:
 * - [x] reset game on both players disconnected.
 * - [x] handle restart game event.
 * - [] Bug, auto timer start on restart game.
 * - [x] Handle player escapes.
 */

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

export default class BackgammonGame extends SocketConnection
    implements GameServerSide {
    players!: GameServerSide['players'];
    score!: GameServerSide['score'];
    stages!: GameServerSide['stages'];
    duration!: GameServerSide['duration'];
    timer!: GameServerSide['timer'];
    rounds!: Round[];

    _userApi = new UserApi();
    _t?: GameServerSide['rounds'][number]['player'];
    _tRef?: NodeJS.Timeout;
    _status!: 'UNINITIALIZED' | 'INITIALIZED' | 'OVER';
    _emitNamespace: typeof emitNamespace;
    _emitNextRound: typeof emitNextRound;
    _handleBrokenPoint: typeof handleBrokenPoint;
    _handleCollectPoint: typeof handleCollectPoint;
    _handleDisconnect: typeof handleDisconnect;
    _handleGameOver: typeof handleGameOver;
    _handleNextRound: typeof handleNextRound;
    _handlePlayerDisconnect: typeof handlePlayerDisconnect;
    _handlePlayersScore: typeof handlePlayersScore;
    _handleRoundCalculate: typeof handleRoundCalculate;
    _handleRoundResult: typeof handleRoundResult;
    _handleTimer: typeof handleTimer;
    _handleUndoRound: typeof handleUndoRound;
    _initializeGame: typeof initializeGame;
    _initializeRound: typeof initializeRound;
    _recursivelySetShortTimer: typeof recursivelySetShortTimer;
    _recursivelySetTimer: typeof recursivelySetTimer;
    _resetGame: typeof resetGame;
    _updatePlayerScore: typeof updatePlayerScore;
    _undoRound: typeof undoRound;
    _withBreakTimer: typeof withBreakTimer;

    constructor(
        public id: number,
        _roomId: number,
        _io: SocketIO.Server,
        disconnectCb: (id: number) => void
    ) {
        super(_io, generateBackgammonGamePath(_roomId, id));

        // methods
        this._emitNamespace = emitNamespace.bind(this);
        this._emitNextRound = emitNextRound.bind(this);
        this._handleBrokenPoint = handleBrokenPoint.bind(this);
        this._handleCollectPoint = handleCollectPoint.bind(this);
        this._handleDisconnect = handleDisconnect.bind(this);
        this._handleGameOver = handleGameOver.bind(this);
        this._handleNextRound = handleNextRound.bind(this);
        this._handlePlayerDisconnect = handlePlayerDisconnect.bind(this);
        this._handlePlayersScore = handlePlayersScore.bind(this);
        this._handleRoundCalculate = handleRoundCalculate.bind(this);
        this._handleRoundResult = handleRoundResult.bind(this);
        this._handleTimer = handleTimer.bind(this);
        this._handleUndoRound = handleUndoRound.bind(this);
        this._initializeGame = initializeGame.bind(this);
        this._initializeRound = initializeRound.bind(this);
        this._recursivelySetShortTimer = recursivelySetShortTimer.bind(this);
        this._recursivelySetTimer = recursivelySetTimer.bind(this);
        this._resetGame = resetGame.bind(this);
        this._updatePlayerScore = updatePlayerScore.bind(this);
        this._undoRound = undoRound.bind(this);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._withBreakTimer = withBreakTimer.bind(this);

        // properties
        this._resetGame();

        this._namespace.on(
            'connection',
            this._handleClientConnection.call(this, disconnectCb)
        );
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
            const shouldContinue = Boolean(
                self._status === 'INITIALIZED' &&
                    (self.players[PLAYERS.BLACK] || self.players[PLAYERS.WHITE])
            );

            socket.emit(GAME_EVENTS.JOIN_GAME, reduceGameProps(self));

            if (shouldInitialize) self._initializeGame();
            else if (shouldContinue) {
                const user = self._users.get(clientId);
                if (user) {
                    logger.info(`Reconnected client is ${user.name}`);

                    const isEmptySpot = !(
                        self.players[PLAYERS.WHITE] &&
                        self.players[PLAYERS.BLACK]
                    );
                    if (isEmptySpot) {
                        const emptyPlayerSpot = self.players[PLAYERS.WHITE]
                            ? PLAYERS.BLACK
                            : PLAYERS.WHITE;
                        self.players[emptyPlayerSpot] = user;
                    }

                    // Send game in again within updated players
                    socket.emit(GAME_EVENTS.JOIN_GAME, reduceGameProps(self));

                    // TODO: control if the last round done.
                    self._emitNamespace(
                        GAME_EVENTS.ROUND,
                        self.rounds[self.rounds.length - 1]
                    );
                }
            }

            socket.on(
                GAME_EVENTS.ROUND,
                self._withBreakTimer(self._handleRoundCalculate).bind(self)
            );
            socket.on(
                GAME_EVENTS.BROKEN_POINT_ROUND,
                self._withBreakTimer(self._handleBrokenPoint).bind(self)
            );
            socket.on(
                GAME_EVENTS.COLLECT_POINT_ROUND,
                self._withBreakTimer(self._handleCollectPoint).bind(self)
            );
            socket.on(GAME_EVENTS.UNDO_ROUND, self._handleUndoRound.bind(self));

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
}
