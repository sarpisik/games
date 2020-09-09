import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { reduceGameProps } from '../../helpers';

export default function emitGameUpdate(
    this: BackgammonGame,
    event: GAME_EVENTS
) {
    this._emitNamespace(event, reduceGameProps(this));
}
