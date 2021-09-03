import React from 'react';
import Konva from 'konva';
import { Image } from 'react-konva';
import { OFFSETS } from '../../../../../../../../../../configs';
import { useUnitMeasure } from '../../../../../../hooks';

const SPINNER_SPEED = 400;
const ROTATE_DIRECTION = -1;
const { x, y, width } = OFFSETS.NOTIFICATION.icons.spinner;

export default function Spinner(
    props: React.ComponentProps<typeof Image>
): React.ReactElement {
    const ref = React.useRef<typeof Image>(null);
    const posX = useUnitMeasure(x, 'x');
    const posY = useUnitMeasure(y, 'x');
    const radius = useUnitMeasure(width, 'x');

    React.useEffect(() => {
        const element = ref.current as Exclude<typeof ref.current, null>;
        // @ts-ignore
        const anim = new Konva.Animation(rotate(element), element.getLayer());

        anim.start();

        return () => {
            anim.stop();
        };
    }, []);

    return (
        <Image
            // @ts-ignore
            ref={ref}
            x={posX}
            y={posY}
            width={radius}
            height={radius}
            offsetX={division(radius, 2)}
            offsetY={division(radius, 2)}
            {...props}
        />
    );
}

function rotate(element: any) {
    return (frame: any) =>
        element.rotate(
            multiple(
                division(multiple(frame.timeDiff, SPINNER_SPEED), 1000),
                ROTATE_DIRECTION
            )
        );
}
function division(n1: number, n2: number) {
    return n1 / n2;
}
function multiple(n1: number, n2: number) {
    return n1 * n2;
}
