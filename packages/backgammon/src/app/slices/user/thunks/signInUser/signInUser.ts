import { API, graphqlOperation, Hub } from 'aws-amplify';
import Observable, { ZenObservable } from 'zen-observable-ts';
import { onUpdateUser } from '../../../../../graphql/subscriptions';
import { User } from '../../../../../types/user';
import { AppThunk } from '../../../../store';
import { setFeedback } from '../../../feedbacks';
import { FEEDBACK_STATUS } from '../../../feedbacks/feedbacks';
import { initialState, setUser, setUserState } from '../../user';
import { handleUserAuth } from './utils';

const signInUser: () => AppThunk = () => async (dispatch) => {
    let subscription: ZenObservable.Subscription;

    const setUserFetching = () => {
        dispatch(
            setFeedback({ setUser: { status: FEEDBACK_STATUS.FETCHING } })
        );
    };

    const setUserSuccess = (user: User) => {
        dispatch(setUser(user));
        dispatch(setFeedback({ setUser: { status: FEEDBACK_STATUS.SUCCESS } }));
        // Subscribe to update events.
        subscription = (API.graphql(
            graphqlOperation(onUpdateUser, { owner: user.owner })
        ) as Observable<{
            value?: { data?: { onUpdateUser: typeof user } };
        }>).subscribe({
            next(v) {
                const user = v?.value?.data?.onUpdateUser;
                user &&
                    dispatch(
                        setUser(Object.assign({}, user, { state: 'INITIAL' }))
                    );
                console.log('subscribe result');
                console.log(v);
            },
            // @ts-ignore
            error(e) {
                dispatch(setUserState({ state: 'ERROR' }));
                console.log('subscribe error');
                console.error(e);
            },
        });
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
                    subscription.unsubscribe();
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
