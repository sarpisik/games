import { useMeasures } from '../useMeasures';
import { useRound } from '../../../game';
import { COLORS } from '../../../../../config';

export default function useContainers() {
    const measures = useMeasures();
    const round = useRound();
    const { containers } = measures;

    const highlightContainer = handleHighlightContainer(
        round?.availableTriangles
    );

    return containers.map(highlightContainer);
}

type AvailableTriangles = ReturnType<typeof useRound>['availableTriangles'];
type Container = ReturnType<typeof useMeasures>['containers'][number];

const INDEX_MAP: { [key: number]: number } = { 0: -1, 1: 24 };

function handleHighlightContainer(availableTriangles?: AvailableTriangles) {
    return function highlightContainer(container: Container, i: number) {
        const isExist = INDEX_MAP[i];
        const containerIndex = typeof isExist === 'number' ? isExist : -99;
        const shouldHighlight = availableTriangles?.includes(containerIndex);

        if (shouldHighlight) {
            container = Object.assign({}, container, {
                color: COLORS.HIGHLIGHT,
                shadowColor: 'black',
                shadowBlur: 10,
            });
        }

        return container;
    };
}
