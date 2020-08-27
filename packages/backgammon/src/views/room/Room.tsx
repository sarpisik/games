import React from 'react';
import { useConnectRoom } from './hooks';
import { useRoom } from '../../app/slices';
import { Link } from 'react-router-dom';

export default function Room(): React.ReactElement {
    useConnectRoom();
    const room = useRoom();
    const { id, games } = room;

    return (
        <ul>
            {games.map((game) => (
                <li key={game.id}>
                    <Link to={`/${id}/${game.id.toString()}`}>
                        Game {game.id}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
