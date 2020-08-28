import React from 'react';
import { Link } from 'react-router-dom';
import { GameClient } from 'types/lib/backgammon';
import { Settings } from './components';

interface Props {
    gameId: GameClient['id'];
    url: string;
    title: React.ReactNode;
}

export default function Header(props: Props): React.ReactElement {
    const { gameId, url, title } = props;

    return (
        <React.Fragment>
            <Link to={url}>{title}</Link>
            <Settings gameId={gameId} />
        </React.Fragment>
    );
}
