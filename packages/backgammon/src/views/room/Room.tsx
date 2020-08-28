import React from 'react';
import Container from 'react-bootstrap/Container';
import { Games, withRoomConnection } from './components';

export default withRoomConnection(Room);

function Room(): React.ReactElement {
    return (
        <Container className="h-100">
            <Games />
        </Container>
    );
}
