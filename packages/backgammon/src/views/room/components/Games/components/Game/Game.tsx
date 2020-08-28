import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

interface GameProps {
    url: string;
    children: React.ReactNode;
}

export default function Game(props: GameProps): React.ReactElement {
    const { url, children } = props;

    return (
        <Col key={url}>
            <Link to={url}>{children}</Link>
        </Col>
    );
}
