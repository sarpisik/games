import {
    useGame,
    usePaintLayout,
    useRound,
} from '../../../../../../../../../../app/slices';
import { PLAYERS } from '../../../../../../constants';
import { useUnit } from '../../../../../../hooks/useUnit';
import { CircleProps } from '../../../shared/components/Point/components/Circle';
import { generatePlayerColor } from '../../../shared/utils';
import { BrokenPointProps } from '../../shared/types';
import { filterBrokenPoint, generateBrokenPointProps } from './utils';

type OnDragEnd = CircleProps['onDragEnd'];
type OnDragStart = CircleProps['onDragStart'];

interface Params {
    pLight: HTMLImageElement;
    pDark: HTMLImageElement;
}

export default function useBrokenPoints(params: Params): BrokenPointProps[] {
    const { pLight, pDark } = params;
    const { isRoundPlayer } = useGame().game;
    const round = useRound();
    const { getUnit } = useUnit();
    const { paintTriangle, paintBrokenPointTriangles } = usePaintLayout();

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
            generateBrokenPointProps(
                isRoundPlayer,
                round,
                PLAYERS.BLACK,
                pDark
            ),
        round?.brokens[PLAYERS.WHITE] > 0 &&
            generateBrokenPointProps(
                isRoundPlayer,
                round,
                PLAYERS.WHITE,
                pLight
            ),
    ]
        .filter(filterBrokenPoint)
        .map((props) => {
            props.onDragEnd = onDragEnd;
            props.onDragStart = onDragStart;

            return props;
        });

    return brokens;
}
