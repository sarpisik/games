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

        case 'REJECT': {
            this._emitNamespace(GAME_EVENTS.SURRENDER, data);
            setTimeout(() => {
                this._status = 'INITIALIZED';
                this._handleTimer();
            }, 2000);
            break;
        }

        default:
            break;
    }
}
