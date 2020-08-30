import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRooms } from '../../app/slices';
import { withRoomsConnection } from './components';
import { withAuthorization } from '../../components';

export default withAuthorization(withRoomsConnection(Rooms));

function Rooms(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;
    const rooms = useRooms();
    const { ids } = rooms;

    return (
        <ul>
            {ids.map((id) => (
                <li key={id}>
                    <Link to={`${url}/${id}`}>Room {id}</Link>
                </li>
            ))}
        </ul>
    );
}
