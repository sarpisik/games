import { Round } from '../../../../../../../../../../app/slices/round';
import { PLAYERS } from '../../../../../../../../constants';
import { BrokenPointProps } from '../../../../shared/types';
import { COORDINATES } from './constants';
import { generateLabelCoords } from './utils';
import { CIRCLE_SIZE } from '../../../../../shared/components/Point/components/Circle/constants';

export default function generateBrokenPointProps(
    round: Round,
    pointPlayer: Round['player']
): BrokenPointProps {
    const { x, y } = COORDINATES[pointPlayer];
    const labelCoords = generateLabelCoords(x, y, pointPlayer);
    const {
        text: { x: labelX, y: labelY },
        background: { x: bgX, y: bgY },
    } = labelCoords;

    const props: BrokenPointProps = {
        key: pointPlayer,
        x,
        y,
        color: PLAYERS[pointPlayer],
        draggable: Boolean(round.player === pointPlayer),
        label: {
            x: labelX,
            y: labelY,
            text: round.brokens[pointPlayer],
            color: '#000000',
            background: {
                x: bgX,
                y: bgY,
                color: '#ffffff',
                width: 2 * CIRCLE_SIZE.RADIUS,
                height: CIRCLE_SIZE.RADIUS,
            },
        },
    };

    return props;
}
