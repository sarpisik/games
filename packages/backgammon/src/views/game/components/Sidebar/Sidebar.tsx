import React from 'react';
import styles from './Sidebar.module.css';
import { useConnectGame } from './hooks';
// import { useInitializeGame } from './hooks';

interface Props {
    children: React.ReactNode;
}

export default function Sidebar(props: Props): React.ReactElement {
    const { children } = props;
    useConnectGame();
    // useInitializeGame();

    return <aside className={styles.sidebar}>{children}</aside>;
}
