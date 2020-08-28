import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { GameClient } from 'types/lib/backgammon';
import { Body, Header } from './components';

interface GameProps {
    id: GameClient['id'];
    url: string;
    children: React.ReactNode;
}

export default function Game(props: GameProps): React.ReactElement {
    const { id, url, children } = props;

    return (
        <Col key={url}>
            <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <Header gameId={id} url={url} title={children} />
                </Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <Body />
                </Card.Body>
            </Card>
        </Col>
    );
}
