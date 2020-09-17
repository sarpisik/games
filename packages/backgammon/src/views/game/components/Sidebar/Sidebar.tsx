import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function Sidebar(props: Props): React.ReactElement {
    const { children } = props;

    return <aside className="flex-grow-1 p-3 text-light">{children}</aside>;
}
