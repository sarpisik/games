import React from 'react';
import Container from 'react-bootstrap/Container';
import { RouteComponentProps } from 'react-router-dom';
import {
    withAuthorization,
    withBreadcrumb,
    withLocaleSwitch,
} from '../../components';
import { Games, withRoomConnection } from './components';

export default withLocaleSwitch(
    withAuthorization(withBreadcrumb(withRoomConnection(Room)))
);

function Room(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;

    return (
        <Container className="h-100">
            <Games url={url} />
        </Container>
    );
}
