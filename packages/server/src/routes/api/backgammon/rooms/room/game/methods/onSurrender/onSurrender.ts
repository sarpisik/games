import { EmitSurrender } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function handleSurrender(
    this: BackgammonGame,
    data: EmitSurrender
) {
    this._setStatus('SURRENDER', data);
}
