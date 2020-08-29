import React from 'react';
import { Link } from 'react-router-dom';
import { useRooms } from '../../app/slices';
import { withRoomsConnection } from './components';
import { withAuthentication } from '../../components';

export default withAuthentication<{}>(withRoomsConnection(Rooms));

function Rooms(): React.ReactElement {
    const rooms = useRooms();
    const { ids } = rooms;

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
