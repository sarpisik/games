import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { RouteComponentProps } from 'react-router-dom';
import { withLayout } from '../WithLayout';
import { useItems } from './hooks';

export default function withBreadcrumb<Props extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<Props>
) {
    // @ts-ignore
    return withLayout()(function WithBreadcrumb(
        props: Props
    ): React.ReactElement {
        const items = useItems(props.match.url);

        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Breadcrumb>{items.map(renderItem)}</Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <WrappedComponent {...props} />
                </Row>
            </React.Fragment>
        );
    });
}

function renderItem(props: ReturnType<typeof useItems>[number]) {
    return <Breadcrumb.Item className="text-capitalize" {...props} />;
}
