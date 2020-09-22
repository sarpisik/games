import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useTranslation } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRooms } from '../../app/slices';
import {
    withAuthorization,
    withBreadcrumb,
    withLocaleSwitch,
} from '../../components';
import { withRoomsConnection } from './components';

export default withLocaleSwitch(
    withAuthorization(withBreadcrumb(withRoomsConnection(Rooms)))
);

function Rooms(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;
    const { t } = useTranslation();
    const rooms = useRooms();
    const { ids } = rooms;

    // @ts-ignore
    return ids.map((id) => (
        <Col key={id} sm={6}>
            <ListGroup.Item>
                <Link className="text-capitalize" to={`${url}/${id}`}>{`${t(
                    'room'
                )} ${id}`}</Link>
            </ListGroup.Item>
        </Col>
    ));
}
