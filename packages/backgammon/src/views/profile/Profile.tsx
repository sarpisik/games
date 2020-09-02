import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization } from '../../components';

/*
 * TODO:
 * - [] Form to edit user name.
 * - [] Form to change.
 * - [] Render user details.
 */

export default withAuthorization(Profile);

function Profile(_props: RouteComponentProps): React.ReactElement {
    return <div>profile</div>;
}
