import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function emitNamespace<P>(
    this: BackgammonGame,
    event: string,
    payload: P
) {
    this._namespace.emit(event, payload);

    if (event === GAME_EVENTS.ROUND) this._handleTimer();
}
