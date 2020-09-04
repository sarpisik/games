import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../../../../graphql/mutations';
import { User } from '../../../../../types/user';
import { AppThunk } from '../../../../store';
import { setUserState } from '../../user';

const editUser: (user: Pick<User, 'name' | 'description'>) => AppThunk = (
    user
) => (dispatch, getState) => {
    const _user = getState().user;
    const { id } = _user;

    // Render loading form
    dispatch(setUserState({ state: 'LOADING' }));

    // Update user
    const input = Object.assign({}, user, { id });
    API.graphql(graphqlOperation(updateUser, { input }));
};

export default editUser;
