import React from 'react';
import { Link } from 'react-router-dom';
import { useRoom } from '../../app/slices';
import { withRoomConnection } from './components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default withRoomConnection(Room);

function Room(): React.ReactElement {
    const room = useRoom();
    const { id, games } = room;

    return (
        <Container className="h-100">
            <Row xs={1} sm={2} md={3} className="h-100">
                {games.map((game) => (
                    <Col key={game.id}>
                        <Link to={`/${id}/${game.id.toString()}`}>
                            Game {game.id}
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
