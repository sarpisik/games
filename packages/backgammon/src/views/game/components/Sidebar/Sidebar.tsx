import React from 'react';
import styles from './Sidebar.module.css';
import { useInitializeGame } from './hooks';

interface Props {
    children: React.ReactNode;
}

export default function Sidebar(props: Props): React.ReactElement {
    const { children } = props;
    useInitializeGame();

    return <aside className={styles.sidebar}>{children}</aside>;
}
