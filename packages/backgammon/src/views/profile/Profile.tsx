import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaUserAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { RouteComponentProps } from 'react-router-dom';
import { useUser } from '../../app/slices';
import {
    withAuthorization,
    withBreadcrumb,
    withLocaleSwitch,
} from '../../components';
import { Settings, User } from './components';

export default withLocaleSwitch(withAuthorization(withBreadcrumb(Profile)));

function Profile(_props: RouteComponentProps): React.ReactElement {
    const { user } = useUser();

    return (
        <Container>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
                        <Tab eventKey="user" title={<FaUserAlt />}>
                            <User user={user} />
                        </Tab>
                        <Tab eventKey="settings" title={<MdSettings />}>
                            <Settings user={user} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
