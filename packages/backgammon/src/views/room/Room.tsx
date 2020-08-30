import React from 'react';
import Container from 'react-bootstrap/Container';
import { withAuthorization } from '../../components';
import { Games, withRoomConnection } from './components';
import { RouteComponentProps } from 'react-router-dom';

export default withAuthorization(withRoomConnection(Room));

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
