import { BrokenPoint } from './components';
import { useBrokenPoints } from './hooks';

type Props = Parameters<typeof useBrokenPoints>[0];

export default function BrokenPoints(props: Props): React.ReactElement {
    const points = useBrokenPoints(props);

    // @ts-ignore
    return points.map(renderBrokenPoints);
}

function renderBrokenPoints(props: ReturnType<typeof useBrokenPoints>[number]) {
    return typeof props === 'object' ? props.map(BrokenPoint) : [];
}
