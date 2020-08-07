import React from 'react';

import { Stage } from 'react-konva';

import { SIZES } from '../../constants';
import { ReactReduxContext, Provider } from 'react-redux';

const { BOARD_WIDTH, BOARD_HEIGHT } = SIZES;

type FrameProps = Omit<
    React.ComponentProps<typeof Stage>,
    'className' | 'width' | 'height'
>;

export default function Frame(props: FrameProps): React.ReactElement {
    const { children } = props;
    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    className="board-stage"
                    width={BOARD_WIDTH}
                    height={BOARD_HEIGHT}
                    {...props}
                >
                    <Provider store={store}>{children}</Provider>
                </Stage>
            )}
        </ReactReduxContext.Consumer>
    );
}
