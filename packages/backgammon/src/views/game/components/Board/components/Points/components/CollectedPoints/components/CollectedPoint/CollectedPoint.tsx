import React from 'react';
import { Image } from 'react-konva';

type ImageProps = React.ComponentProps<typeof Image>;

export default function CollectedPoint(_props: ImageProps): React.ReactElement {
    return <Image {..._props} />;
}
