import {
    useGame,
    usePaintLayout,
    useRound,
    useSizes,
} from '../../../../../../../../../../app/slices';
import { PLAYERS } from '../../../../../../constants';
import { useUnit } from '../../../../../../hooks/useUnit';
import { CircleProps } from '../../../shared/components/Point/components/Circle';
import { generatePlayerColor } from '../../../shared/utils';
import { BrokenPointProps } from '../../shared/types';
import { filterBrokenPoint, generateBrokenPoints } from './utils';

type OnDragEnd = CircleProps['onDragEnd'];
type OnDragStart = CircleProps['onDragStart'];

interface Params {
    pLight: HTMLImageElement;
    pDark: HTMLImageElement;
}

export default function useBrokenPoints(
    params: Params
): (boolean | BrokenPointProps[])[] {
    const { pLight, pDark } = params;

    const { isRoundPlayer } = useGame().game;
    const round = useRound();
    const { getUnit } = useUnit();
    const sizes = useSizes();
    const { paintTriangle, paintBrokenPointTriangles } = usePaintLayout();

    const dynamicPointWidth = getUnit(sizes.BOARD_HEIGHT * 0.027, 'y');

    const onDragEnd: OnDragEnd = ({ target }) => {
        const { x, width, y, height } = target.attrs;
        const targetX = getUnit(x + width / 2, 'x');
        const targetY = getUnit(y + height / 2, 'y');
        const color = generatePlayerColor(target).toUpperCase() as
            | 'BLACK'
            | 'WHITE';

        paintTriangle(targetX, targetY, color);
    };

    const onDragStart: OnDragStart = ({ target }) => {
        const color = generatePlayerColor(target);

        paintBrokenPointTriangles(color);
    };

    const brokens = [
        round?.brokens[PLAYERS.BLACK] > 0 &&
            generateBrokenPoints({
                isRoundPlayer,
                round,
                pointPlayer: PLAYERS.BLACK,
                fillPatternImage: pDark,
                width: dynamicPointWidth,
            }),
        round?.brokens[PLAYERS.WHITE] > 0 &&
            generateBrokenPoints({
                isRoundPlayer,
                round,
                pointPlayer: PLAYERS.WHITE,
                fillPatternImage: pLight,
                width: dynamicPointWidth,
            }),
    ]
        .filter(filterBrokenPoint)
        .map((player) =>
            player
                ? player.map((props) => {
                      props.onDragEnd = onDragEnd;
                      props.onDragStart = onDragStart;

                      return props;
                  })
                : player
        );

    return brokens;
}
