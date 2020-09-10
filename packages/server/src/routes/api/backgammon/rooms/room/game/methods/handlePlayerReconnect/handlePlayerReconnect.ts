import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function handlePlayerReconnect(this: BackgammonGame) {
    this._emitGameUpdate(GAME_EVENTS.JOIN_GAME);
    this._emitNamespace(GAME_EVENTS.NOTIFICATION, '');
    this._handleTimer();
}
