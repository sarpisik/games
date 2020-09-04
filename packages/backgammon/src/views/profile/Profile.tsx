import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { RouteComponentProps } from 'react-router-dom';
import { useUser } from '../../app/slices';
import { withAuthorization, withBreadcrumb } from '../../components';
import { Settings, User } from './components';

/*
 * TODO:
 * - [] Form to edit user name.
 * - [] Form to change.
 * - [] Render user details.
 */

export default withAuthorization(withBreadcrumb(Profile));

function Profile(_props: RouteComponentProps): React.ReactElement {
    const { user } = useUser();

    return (
        <Container>
            <Row>
                <Col>
                    <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
                        <Tab eventKey="user" title="User">
                            <User user={user} />
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                            <Settings user={user} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
}
