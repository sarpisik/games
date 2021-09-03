import { GameServerSide } from '@shared-types/backgammon';
import { Round } from '../../round';

export default function verifyRoundPlayer(
    tested: GameServerSide['t']
): tested is Round['player'] {
    return typeof tested !== 'undefined';
}
