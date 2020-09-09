import { EmitScore } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import BackgammonGame from '../../game';
import { checkPlayersFull } from '../../helpers';
import { Round } from '../../round';

type Payload = EmitScore | Partial<BackgammonGame> | Round['player'];

export default function setStatus(
    this: BackgammonGame,
    status: BackgammonGame['_status'],
    payload?: Payload
) {
    this._status = status;

    if (statusUninitialized(status, payload))
        payload?.players ? this._resetGame(payload.players) : this._resetGame();
    else if (statusStart(status, payload)) {
        const { players } = payload;
        this.players = players;
        const playersFull = checkPlayersFull(this.players);
        playersFull
            ? this._setStatus('INITIALIZED')
            : this._emitGameUpdate(GAME_EVENTS.START_GAME);
    } else if (statusInitialized(status, payload))
        this._initializeGame(payload);
    else if (statusOver(status, payload)) this._handleGameOver(payload);
    else {
        logger.error(`Invalid game status. Received: ${status}`);
        this._setStatus('UNINITIALIZED');
    }
}

function statusUninitialized(
    status: BackgammonGame['_status'],
    _payload?: Payload
): _payload is Pick<Extract<Partial<BackgammonGame>, Payload>, 'players'> {
    return status === 'UNINITIALIZED';
}
function statusStart(
    status: BackgammonGame['_status'],
    _payload?: Payload
): _payload is Pick<BackgammonGame, 'players'> {
    return status === 'START';
}
function statusOver(
    status: BackgammonGame['_status'],
    _payload?: Payload
): _payload is Extract<EmitScore, Payload> {
    return status === 'OVER';
}
function statusInitialized(
    status: BackgammonGame['_status'],
    _payload?: Payload
): _payload is Extract<Round['player'], Payload> {
    return status === 'INITIALIZED';
}
