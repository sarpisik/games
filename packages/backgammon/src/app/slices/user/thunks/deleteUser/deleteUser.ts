import axios from 'axios';
import { AppThunk } from '../../../../store';
import { setUserState } from '../../user';

const deleteUser: () => AppThunk = () => async (dispatch, getState) => {
    const _user = getState().user;
    const { id } = _user;

    // Render loading form
    dispatch(setUserState({ state: 'LOADING' }));

    // Delete user
    await axios.delete(`/api/users/${id}`);
};

export default deleteUser;
