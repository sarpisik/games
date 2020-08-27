import React from 'react';
import { Link } from 'react-router-dom';
import { useRoom } from '../../app/slices';
import { withRoomConnection } from './components';

export default withRoomConnection(Room);

function Room(): React.ReactElement {
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
