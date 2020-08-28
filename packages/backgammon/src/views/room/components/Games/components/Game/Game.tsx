import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FaUser, FaRegUser } from 'react-icons/fa';
import { AiTwotoneSetting } from 'react-icons/ai';

interface GameProps {
    url: string;
    children: React.ReactNode;
}

export default function Game(props: GameProps): React.ReactElement {
    const { url, children } = props;

    return (
        <Col key={url}>
            <Card>
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <Link to={url}>{children}</Link>
                    <AiTwotoneSetting />
                </Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-between">
                    <FaUser />
                    -
                    <FaRegUser />
                </Card.Body>
            </Card>
        </Col>
    );
}
