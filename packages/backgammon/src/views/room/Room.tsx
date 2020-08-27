import React from 'react';
import { useConnectRoom } from './hooks';
import { useRoom } from '../../app/slices';
import { Link } from 'react-router-dom';

export default function Room(): React.ReactElement {
    useConnectRoom();
    const room = useRoom();

    return (
        <ul>
            {room.games.map((game) => (
                <li key={game.id}>
                    <Link to={game.id.toString()}>Game {game.id}</Link>
                </li>
            ))}
        </ul>
    );
}
