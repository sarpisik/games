import React from 'react';
import styles from './Sidebar.module.css';

interface Props {
    children: React.ReactNode;
}

export default function Sidebar(props: Props): React.ReactElement {
    const { children } = props;

    return <aside className={styles.sidebar}>{children}</aside>;
}
