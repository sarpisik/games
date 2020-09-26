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
    // @ts-ignore
    withAuthorization(withBreadcrumb(withRoomsConnection(Rooms)))
);

function Rooms(props: RouteComponentProps) {
    return parseRooms(
        useRooms(),
        getUrl(props),
        localizeRoom(useTranslation())
    );
}

function localizeRoom(translation: ReturnType<typeof useTranslation>) {
    return translation.t('room');
}

function getUrl(props: RouteComponentProps) {
    return props.match.url;
}

function parseRooms(
    rooms: ReturnType<typeof useRooms>,
    url: string,
    localizedRoom: string
) {
    return rooms.rooms.map(Room(url, localizedRoom));
}

function Room(url: string, localizedRoom: string) {
    return function _Room(room: ReturnType<typeof useRooms>['rooms'][number]) {
        const { id, users } = room;

        return (
            <Col key={id} sm={6}>
                <ListGroup.Item>
                    <Link
                        className="text-capitalize d-flex justify-content-between"
                        to={`${url}/${id}`}
                    >
                        <span>{`${localizedRoom} ${id}`}</span>
                        <span>{`(${users})`}</span>
                    </Link>
                </ListGroup.Item>
            </Col>
        );
    };
}
