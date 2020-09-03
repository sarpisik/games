import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { RouteComponentProps } from 'react-router-dom';

export default function withBreadcrumb<Props extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithBreadcrumb(props: Props): React.ReactElement {
        return (
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Library
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Data</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <WrappedComponent {...props} />
                </Row>
            </Container>
        );
    };
}
