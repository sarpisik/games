import { GameClient, Round } from 'types/lib/backgammon';
import { BrokenPointProps } from '../../../../shared/types';
import { COORDINATES } from './constants';
import { generateLabelCoords } from './utils';

export default function generateBrokenPointProps(
    isRoundPlayer: GameClient['isRoundPlayer'],
    round: Round,
    pointPlayer: Round['player'],
    fillPatternImage: HTMLImageElement
): BrokenPointProps {
    const { x, y } = COORDINATES[pointPlayer];
    const labelCoords = generateLabelCoords(x, y, pointPlayer);

    const props: BrokenPointProps = {
        key: pointPlayer,
        x,
        y,
        fillPatternImage,
        draggable: Boolean(isRoundPlayer && round.player === pointPlayer),
        label: {
            ...labelCoords,
            text: round.brokens[pointPlayer],
            color: '#000000',
        },
    };

    return props;
}
