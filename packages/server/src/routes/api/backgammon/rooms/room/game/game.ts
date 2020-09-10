/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GameServerSide } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import { UserApi } from '@shared/userApi';
import { SocketConnection } from '../../shared/socketConnection';
import {
    emitGameUpdate,
    emitNamespace,
    emitNextRound,
    handleBrokenPoint,
    handleCollectPoint,
    handleDisconnect,
    handleGameOver,
    handleGameStart,
    handleNextRound,
    handlePlayerDisconnect,
    handlePlayerReconnect,
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
    restartGame,
    setStatus,
    undoRound,
    updatePlayerScore,
    withBreakTimer,
} from './methods';
import { Round } from './round';
import logger from '@shared/Logger';

/*
 * TODO:
 * - [x] reset game on both players disconnected.
 * - [x] handle restart game event.
 * - [] Bug, auto timer start on restart game.
 * - [x] Handle player escapes.
 */

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
    _status!: 'UNINITIALIZED' | 'INITIALIZED' | 'OVER' | 'START';
    _emitGameUpdate: typeof emitGameUpdate;
    _emitNamespace: typeof emitNamespace;
    _emitNextRound: typeof emitNextRound;
    _handleBrokenPoint: typeof handleBrokenPoint;
    _handleCollectPoint: typeof handleCollectPoint;
    _handleDisconnect: typeof handleDisconnect;
    _handleGameOver: typeof handleGameOver;
    _handleGameStart: typeof handleGameStart;
    _handleNextRound: typeof handleNextRound;
    _handlePlayerDisconnect: typeof handlePlayerDisconnect;
    _handlePlayerReconnect: typeof handlePlayerReconnect;
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
    _restartGame: typeof restartGame;
    _setStatus: typeof setStatus;
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
        this._emitGameUpdate = emitGameUpdate.bind(this);
        this._emitNamespace = emitNamespace.bind(this);
        this._emitNextRound = emitNextRound.bind(this);
        this._handleBrokenPoint = handleBrokenPoint.bind(this);
        this._handleCollectPoint = handleCollectPoint.bind(this);
        this._handleDisconnect = handleDisconnect.bind(this);
        this._handleGameOver = handleGameOver.bind(this);
        this._handleGameStart = handleGameStart.bind(this);
        this._handleNextRound = handleNextRound.bind(this);
        this._handlePlayerDisconnect = handlePlayerDisconnect.bind(this);
        this._handlePlayerReconnect = handlePlayerReconnect.bind(this);
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
        this._restartGame = restartGame.bind(this);
        this._setStatus = setStatus.bind(this);
        this._updatePlayerScore = updatePlayerScore.bind(this);
        this._undoRound = undoRound.bind(this);
        // @ts-ignore
        this._withBreakTimer = withBreakTimer.bind(this);

        // properties
        this._setStatus('UNINITIALIZED');

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
            const user = self._users.get(clientId);
            logger.info(`Reconnected client is ${user?.name}`);

            socket.on(
                GAME_EVENTS.START_GAME,
                // @ts-ignore
                self._withBreakTimer(self._handleGameStart).bind(self)
            );
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
            socket.on(GAME_EVENTS.RESTART_GAME, self._restartGame.bind(self));

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
