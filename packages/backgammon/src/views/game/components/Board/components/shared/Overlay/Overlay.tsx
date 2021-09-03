import React from 'react';
import { Rect } from 'react-konva';
import {
    Props,
    withUnitMeasure,
} from '../../Sidebar/components/withUnitMeasure';

export default withUnitMeasure(Overlay);

function Overlay(props: Props): React.ReactElement {
    return <Rect fill="rgba(0,0,0,0.5)" {...props} />;
}
