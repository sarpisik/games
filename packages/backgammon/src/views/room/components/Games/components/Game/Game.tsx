import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { GameClient } from 'types/lib/backgammon';
import { Body, Header } from './components';

type BodyProps = React.ComponentProps<typeof Body>;

interface GameProps extends Omit<BodyProps, 'gameId'> {
    id: GameClient['id'];
    url: string;
    children: React.ReactNode;
}

export default function Game(props: GameProps): React.ReactElement {
    const { id, url, children, ...bodyProps } = props;

    return (
        <Col key={url}>
            <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <Header gameId={id} url={url} title={children} />
                </Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <Body gameId={id} {...bodyProps} />
                </Card.Body>
            </Card>
        </Col>
    );
}
