import { Round } from '../../../../../../../../../../../../app/slices/round';
import { CIRCLE_SIZE } from '../../../../../../../shared/components/Point/components/Circle/constants';
import { PLAYERS } from '../../../../../../../../../../constants';

const OFFSET = 0.5;

export default function generateLabelCoords(
    x: number,
    y: number,
    player: Round['player']
) {
    const dynamicY =
        player === PLAYERS.BLACK
            ? y - CIRCLE_SIZE.RADIUS - OFFSET - 1.5
            : y + CIRCLE_SIZE.RADIUS + OFFSET;

    const text = { x: x - CIRCLE_SIZE.RADIUS + 1, y: dynamicY };
    const background = { x: x - CIRCLE_SIZE.RADIUS, y: dynamicY };

    return { text, background };
}
