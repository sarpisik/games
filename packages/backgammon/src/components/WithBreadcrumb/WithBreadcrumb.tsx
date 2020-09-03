import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { RouteComponentProps } from 'react-router-dom';
import { useItems } from './hooks';

export default function withBreadcrumb<Props extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithBreadcrumb(props: Props): React.ReactElement {
        const items = useItems(props.match.url);

        return (
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>{items.map(renderItem)}</Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <WrappedComponent {...props} />
                </Row>
            </Container>
        );
    };
}

function renderItem(props: ReturnType<typeof useItems>[number]) {
    return <Breadcrumb.Item {...props} />;
}
