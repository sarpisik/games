import axios from 'axios';
import { User } from '../../../../../types/user';
import { AppThunk } from '../../../../store';
import { setUserState } from '../../user';

const editUser: (user: Pick<User, 'name' | 'description'>) => AppThunk = (
    user
) => async (dispatch, getState) => {
    const _user = getState().user;
    const { id } = _user;

    // Render loading form
    dispatch(setUserState({ state: 'LOADING' }));

    // Update user
    await axios.put(`/api/users/${id}`, { ...user, owner: _user.owner });
};

export default editUser;
