import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import {
    FaMinusCircle,
    FaThumbsDown,
    FaThumbsUp,
    FaTrophy,
} from 'react-icons/fa';
import { User as U } from '../../../../types/user';

interface Props {
    user: U;
}

export default function User(props: Props): React.ReactElement {
    const { user } = props;
    const { name, description, email, createdAt, backgammon } = user;
    const { score, wins, loses, escapes } = backgammon;

    return (
        <Card className="border-top-0 rounded-0">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>{description}</Card.Subtitle>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{email}</ListGroupItem>
                <ListGroupItem>{createdAt}</ListGroupItem>
                <ListGroupItem>
                    <FaTrophy />
                    <span className="ml-3">{score}</span>
                </ListGroupItem>
                <ListGroupItem>
                    <FaThumbsUp />
                    <span className="ml-3">{wins}</span>
                </ListGroupItem>
                <ListGroupItem>
                    <FaThumbsDown />
                    <span className="ml-3">{loses}</span>
                </ListGroupItem>
                <ListGroupItem>
                    <FaMinusCircle />
                    <span className="ml-3">{escapes}</span>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}
