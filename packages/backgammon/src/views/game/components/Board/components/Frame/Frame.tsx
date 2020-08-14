import React from 'react';
import { Stage } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { useSizes } from '../../../../../../app/slices/measures';

import styles from './Frame.module.css';

type FrameProps = Omit<
    React.ComponentProps<typeof Stage>,
    'className' | 'width' | 'height'
>;

export default function Frame(props: FrameProps): React.ReactElement {
    const { children } = props;
    const sizes = useSizes();
    const { BOARD_HEIGHT, BOARD_WIDTH } = sizes;
    return (
        <ReactReduxContext.Consumer>
            {({ store }) => (
                <Stage
                    className={styles.frame}
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
