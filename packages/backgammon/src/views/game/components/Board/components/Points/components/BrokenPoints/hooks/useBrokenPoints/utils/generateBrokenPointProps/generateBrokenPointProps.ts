import { GameClient, PLAYERS, Round } from 'types/lib/backgammon';
import { BrokenPointProps } from '../../../../shared/types';
import { COORDINATES } from './constants';
import { xOffsetCalculator } from './utils';
// import { generateLabelCoords } from './utils';

interface Params {
    isRoundPlayer: GameClient['isRoundPlayer'];
    round: Round;
    pointPlayer: Round['player'];
    fillPatternImage: HTMLImageElement;
    width: number;
    points: number;
}

export default function generateBrokenPointProps(
    i: number,
    {
        isRoundPlayer,
        round,
        pointPlayer,
        fillPatternImage,
        width,
        points,
    }: Params
): BrokenPointProps {
    const { x, y } = COORDINATES[pointPlayer];
    // const labelCoords = generateLabelCoords(x, y, pointPlayer);

    const props: BrokenPointProps = {
        key: PLAYERS[pointPlayer] + i,
        x: xOffsetCalculator(x, i, points),
        y,
        width,
        fillPatternImage,
        draggable: Boolean(isRoundPlayer && round.player === pointPlayer),
        // label: {
        //     ...labelCoords,
        //     text: round.brokens[pointPlayer],
        //     color: '#000000',
        // },
    };

    return props;
}
