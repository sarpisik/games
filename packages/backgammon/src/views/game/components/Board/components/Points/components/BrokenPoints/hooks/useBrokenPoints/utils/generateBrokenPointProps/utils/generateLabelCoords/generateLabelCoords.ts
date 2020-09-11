import { Round } from 'types/lib/backgammon';
import { PLAYERS } from '../../../../../../../../../../constants';
import { CIRCLE_SIZE } from '../../../../../../../shared/components/Point/components/Circle/constants';

const FULL_CIRCLE = CIRCLE_SIZE.RADIUS * 2;

export default function generateLabelCoords(
    x: number,
    y: number,
    player: Round['player']
) {
    const dynamicY =
        player === PLAYERS.BLACK ? 20 - FULL_CIRCLE : 25 + FULL_CIRCLE;

    const text = {
        x: x,
        y: dynamicY,
        width: FULL_CIRCLE,
    };

    return text;
}
