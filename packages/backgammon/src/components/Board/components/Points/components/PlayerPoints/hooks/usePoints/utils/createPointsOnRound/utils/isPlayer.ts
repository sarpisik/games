import { Round } from '../../../../../../../../../../../app/slices/round/constants';
import { PLAYERS } from '../../../../../../../../../constants';

export default function isPlayer(tested: number): tested is Round['player'] {
    return tested === PLAYERS.BLACK || tested === PLAYERS.WHITE;
}
