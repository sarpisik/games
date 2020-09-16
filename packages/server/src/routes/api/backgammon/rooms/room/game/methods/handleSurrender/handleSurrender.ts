import { EmitSurrender, GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function handleSurrender(
    this: BackgammonGame,
    data: EmitSurrender
) {
    switch (data.type) {
        case 'REQUEST':
            this._emitNamespace(GAME_EVENTS.SURRENDER, data);
            break;

        default:
            break;
    }
}
