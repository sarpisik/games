import axios from 'axios';
import { AppThunk } from '../../../../store';
import { initialState, setUser, setUserState } from '../../user';

const deleteUser: () => AppThunk = () => async (dispatch, getState) => {
    try {
        const _user = getState().user;
        const { id } = _user;

        // Render loading form
        dispatch(setUserState({ state: 'LOADING' }));

        // Delete user
        await axios.delete(`/api/users/${id}`);

        // Set initial user state
        dispatch(setUser(initialState));
    } catch (error) {
        dispatch(setUserState({ state: 'ERROR' }));
        console.log('User delete failed.');
        console.error(error);
    }
};

export default deleteUser;
