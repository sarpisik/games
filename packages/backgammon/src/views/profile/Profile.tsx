import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { RouteComponentProps } from 'react-router-dom';
import { useUser } from '../../app/slices';
import { withAuthorization, withBreadcrumb } from '../../components';

/*
 * TODO:
 * - [] Form to edit user name.
 * - [] Form to change.
 * - [] Render user details.
 */

export default withAuthorization(withBreadcrumb(Profile));

function Profile(_props: RouteComponentProps): React.ReactElement {
    const { user } = useUser();

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card>
                        <Card.Header>Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Text>{user.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{user.email}</ListGroupItem>
                            <ListGroupItem>{user.createdAt}</ListGroupItem>
                            <ListGroupItem>{user.wins}</ListGroupItem>
                            <ListGroupItem>{user.loses}</ListGroupItem>
                            <ListGroupItem>{user.escapes}</ListGroupItem>
                            <ListGroupItem>
                                <Button variant="danger">Delete</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
