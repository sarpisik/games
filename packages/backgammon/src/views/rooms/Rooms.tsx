import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRooms } from '../../app/slices';
import {
    withAuthorization,
    withBreadcrumb,
    withLocaleGuard,
} from '../../components';
import { withRoomsConnection } from './components';
import { useTranslation } from 'react-i18next';

export default withLocaleGuard(
    withAuthorization(withBreadcrumb(withRoomsConnection(Rooms)))
);

function Rooms(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;
    const { t } = useTranslation();
    const rooms = useRooms();
    const { ids } = rooms;

    return (
        <ul>
            {ids.map((id) => (
                <li key={id}>
                    <Link className="text-capitalize" to={`${url}/${id}`}>{`${t(
                        'room'
                    )} ${id}`}</Link>
                </li>
            ))}
        </ul>
    );
}
