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

export default function useBrokenPoints(): BrokenPointProps[] {
    const { isRoundPlayer } = useGame().game;
    const round = useRound();
    const { getUnit } = useUnit();
    const { paintTriangle, paintBrokenPointTriangles } = usePaintLayout();

    const onDragEnd: OnDragEnd = ({ target }) => {
        const targetX = getUnit(target.attrs.x, 'x');
        const targetY = getUnit(target.attrs.y, 'y');
        const color = target.attrs.fill.toUpperCase();

        paintTriangle(targetX, targetY, color);
    };

    const onDragStart: OnDragStart = ({ target }) => {
        const color = generatePlayerColor(target);

        paintBrokenPointTriangles(color);
    };

    const brokens = [
        round?.brokens[PLAYERS.BLACK] > 0 &&
            generateBrokenPointProps(isRoundPlayer, round, PLAYERS.BLACK),
        round?.brokens[PLAYERS.WHITE] > 0 &&
            generateBrokenPointProps(isRoundPlayer, round, PLAYERS.WHITE),
    ]
        .filter(filterBrokenPoint)
        .map((props) => {
            props.onDragEnd = onDragEnd;
            props.onDragStart = onDragStart;

            return props;
        });

    return brokens;
}
