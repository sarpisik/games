import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Trans } from 'react-i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withLayout, withLocaleSwitch } from '../../components';
import { ROUTES } from '../../configs';
import { User } from './components';

export default withLocaleSwitch(withLayout()(Home));

function Home(props: RouteComponentProps): React.ReactElement {
    const {
        match: { url },
    } = props;

    return (
        <Row className="h-100 justify-content-sm-center">
            <Col className="d-flex flex-column justify-content-center" sm={6}>
                <ListGroup className="text-capitalize text-center">
                    <ListGroup.Item>
                        <Link className="d-block" to={`${url}${ROUTES.ROOMS}`}>
                            <Trans i18nKey="links.rooms" />
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link
                            className="d-block"
                            to={`${url}${ROUTES.PROFILE}`}
                        >
                            <Trans i18nKey="links.profile" />
                        </Link>
                    </ListGroup.Item>
                    <User />
                </ListGroup>
            </Col>
        </Row>
    );
}
