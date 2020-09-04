import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { User as U } from '../../../../types/user';

interface Props {
    user: U;
}

export default function User(props: Props): React.ReactElement {
    const { user } = props;

    return (
        <Card className="border-top-0 rounded-0">
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle>{user.description}</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{user.email}</ListGroupItem>
                <ListGroupItem>{user.createdAt}</ListGroupItem>
                <ListGroupItem>{user.wins}</ListGroupItem>
                <ListGroupItem>{user.loses}</ListGroupItem>
                <ListGroupItem>{user.escapes}</ListGroupItem>
            </ListGroup>
        </Card>
    );
}
