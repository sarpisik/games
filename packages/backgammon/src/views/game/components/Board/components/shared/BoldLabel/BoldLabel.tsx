import React from 'react';
import { Label } from '../../Label';

export default function BoldLabel(
    props: Omit<React.ComponentProps<typeof Label>, 'fontStyle'>
): React.ReactElement {
    return <Label fontStyle="bold" {...props} />;
}
