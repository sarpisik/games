import React from 'react';
import styles from './Sidebar.module.css';

interface Props {
    children: React.ReactNode;
}

export default function Sidebar(props: Props): React.ReactElement {
    const { children } = props;
    const className = `${styles.sidebar} flex-grow-1 text-light h-100`;

    return <aside className={className}>{children}</aside>;
}
