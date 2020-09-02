import {
    EmitStageOver,
    GameServerSide,
    OPPONENT,
    PLAYERS,
} from '@shared-types/backgammon';
import { ONE_SECOND, SHORT_TIMER } from '@shared-types/constants';
import { EmitGame, GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import { SocketConnection } from '../../shared/socketConnection';
import { generatePlayersObj, verifyRoundPlayer } from './helpers';
import {
    handleBrokenPoint,
    handleCollectPoint,
    handleDisconnect,
    handleNextRound,
    handleRoundCalculate,
    handleRoundResult,
    handleUndoRound,
    initializeGame,
    initializeRound,
    undoRound,
    withBreakTimer,
} from './methods';
import { Round } from './round';

/*
 * TODO:
 * - [] reset game on both players disconnected.
 * - [] handle restart game event.
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
    players: GameServerSide['players'];
    score: GameServerSide['score'];
    stages: GameServerSide['stages'];
    duration: GameServerSide['duration'];
    timer: GameServerSide['timer'];
    rounds: Round[];

    _t?: GameServerSide['rounds'][number]['player'];
    _tRef?: NodeJS.Timeout;
    _status: 'UNINITIALIZED' | 'INITIALIZED' | 'OVER';
    _handleBrokenPoint: typeof handleBrokenPoint;
    _handleCollectPoint: typeof handleCollectPoint;
    _handleDisconnect: typeof handleDisconnect;
    _handleNextRound: typeof handleNextRound;
    _handleRoundCalculate: typeof handleRoundCalculate;
    _handleRoundResult: typeof handleRoundResult;
    _handleUndoRound: typeof handleUndoRound;
    _initializeGame: typeof initializeGame;
    _initializeRound: typeof initializeRound;
    _undoRound: typeof undoRound;
    _withBreakTimer: typeof withBreakTimer;

    constructor(
        public id: number,
        _roomId: number,
        _io: SocketIO.Server,
        disconnectCb: (id: number) => void
    ) {
        super(_io, generateBackgammonGamePath(_roomId, id));

        // properties
        this.players = generatePlayersObj(null, null);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];
        this._status = 'UNINITIALIZED';

        // methods
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._withBreakTimer = withBreakTimer.bind(this);
        this._handleBrokenPoint = handleBrokenPoint.bind(this);
        this._handleCollectPoint = handleCollectPoint.bind(this);
        this._handleDisconnect = handleDisconnect.bind(this);
        this._handleNextRound = handleNextRound.bind(this);
        this._handleRoundCalculate = handleRoundCalculate.bind(this);
        this._handleRoundResult = handleRoundResult.bind(this);
        this._handleUndoRound = handleUndoRound.bind(this);
        this._initializeGame = initializeGame.bind(this);
        this._initializeRound = initializeRound.bind(this);
        this._undoRound = undoRound.bind(this);

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

    /*
     * * * * * * * * * * * *
     * GAME LOGICS
     * * * * * * * * * * * *
     */

    _handleGameOver(payload: EmitStageOver) {
        this._status = 'OVER';
        this._emitNamespace(GAME_EVENTS.GAME_OVER, payload);
    }

    /*
     * * * * * * * * * * * *
     * UTILITIES
     * * * * * * * * * * * *
     */

    _emitNextRound(round: Round) {
        this.rounds.push(round);
        this._emitNamespace(GAME_EVENTS.ROUND, round);
    }

    _emitNamespace<P>(event: string, payload: P) {
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
                this._handleGameOver({ winner });
            } else {
                this._emitNamespace(GAME_EVENTS.TIMER, this.timer);

                this._tRef = setTimeout(() => {
                    this._recursivelySetTimer(latestRoundPlayer);
                }, ONE_SECOND);
            }
        }
    }
}
