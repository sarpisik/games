import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { RouteComponentProps } from 'react-router-dom';
import { Flag } from './components';

export default function withLocaleSwitch<
    Props extends RouteComponentProps<{ lang: string }>
>(WrappedComponent: React.ComponentType<Props>) {
    return function WithLocaleSwitch(props: Props): React.ReactElement {
        const {
            match: { params },
        } = props;
        const locale = params.lang.toLowerCase();

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <Flag flag={locale} />
                        </Col>
                    </Row>
                </Container>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
}
