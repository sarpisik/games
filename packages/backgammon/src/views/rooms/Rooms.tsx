import React from 'react';
import { useConnection } from './hooks';
import { useRooms } from '../../app/slices';
import { Link } from 'react-router-dom';

export default function Rooms(): React.ReactElement {
    const rooms = useRooms();
    const { ids } = rooms;
    useConnection();

    return (
        <ul>
            {ids.map((id) => (
                <li key={id}>
                    <Link to={`/${id}`}>Room {id}</Link>
                </li>
            ))}
        </ul>
    );
}
