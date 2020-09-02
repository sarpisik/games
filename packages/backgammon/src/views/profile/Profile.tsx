import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withAuthorization } from '../../components';

export default withAuthorization(Profile);

function Profile(_props: RouteComponentProps): React.ReactElement {
    return <div>profile</div>;
}
