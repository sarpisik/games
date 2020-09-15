import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Body, Header } from './components';

type BodyProps = React.ComponentProps<typeof Body>;
type HeaderProps = React.ComponentProps<typeof Header>;

interface GameProps {
    bodyProps: BodyProps;
    headerProps: HeaderProps;
}

export default function Game(props: GameProps): React.ReactElement {
    const { bodyProps, headerProps } = props;

    return (
        <Col key={headerProps.url} className="py-2">
            <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <Header {...headerProps} />
                </Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <Body {...bodyProps} />
                </Card.Body>
            </Card>
        </Col>
    );
}
