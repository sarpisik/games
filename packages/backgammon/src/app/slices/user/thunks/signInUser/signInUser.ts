import { Hub } from 'aws-amplify';
import { User } from '../../../../../types/user';
import { AppThunk } from '../../../../store';
import { setFeedback } from '../../../feedbacks';
import { FEEDBACK_STATUS } from '../../../feedbacks/feedbacks';
import { initialState, setUser } from '../../user';
import { handleUserAuth } from './utils';

const signInUser: () => AppThunk = () => async (dispatch) => {
    const setUserFetching = () => {
        dispatch(
            setFeedback({ setUser: { status: FEEDBACK_STATUS.FETCHING } })
        );
    };

    const setUserSuccess = (user: User) => {
        dispatch(setUser(user));
        dispatch(setFeedback({ setUser: { status: FEEDBACK_STATUS.SUCCESS } }));
        // Subscribe to update events.
    };

    const setUserError = () => {
        dispatch(
            setFeedback({
                setUser: {
                    status: FEEDBACK_STATUS.ERROR,
                    message: 'Invalid user.',
                },
            })
        );
    };
    try {
        await handleUserAuth(setUserFetching, setUserSuccess, setUserError);

        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    handleUserAuth(
                        setUserFetching,
                        setUserSuccess,
                        setUserError
                    );
                    break;
                case 'signOut':
                    setUser(initialState);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);

                    setUserError();
                    break;
            }
        });
    } catch (error) {
        console.warn('Error on sign in user.');
        console.error(error);

        setUserError();
    }
};

export default signInUser;
