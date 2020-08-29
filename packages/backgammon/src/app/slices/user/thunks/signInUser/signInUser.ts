import { Auth, Hub } from 'aws-amplify';
import { User } from 'types/lib/backgammon';
import { AppThunk } from '../../../../store';
import { setUser, initialState } from '../../user';
import { setFeedback } from '../../../feedbacks';
import { FEEDBACK_STATUS } from '../../../feedbacks/feedbacks';

interface AuthUser {
    username: string;
    attributes: Attributes;
}

interface Attributes {
    sub: string;
    identities: string;
    email_verified: boolean;
    email: string;
}
type Identities = Identity[];
interface Identity {
    userId: string;
    providerName: string;
    providerType: string;
    issuer?: any;
    primary: boolean;
    dateCreated: number;
}

const signInUser: () => AppThunk = () => async (dispatch) => {
    try {
        dispatch(
            setFeedback({ setUser: { status: FEEDBACK_STATUS.FETCHING } })
        );
        const user = await getUser();
        dispatch(setUser(user));
        dispatch(setFeedback({ setUser: { status: FEEDBACK_STATUS.SUCCESS } }));

        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    dispatch(
                        setFeedback({
                            setUser: { status: FEEDBACK_STATUS.FETCHING },
                        })
                    );

                    getUser().then((userData) => dispatch(setUser(userData)));

                    dispatch(
                        setFeedback({
                            setUser: { status: FEEDBACK_STATUS.SUCCESS },
                        })
                    );
                    break;
                case 'signOut':
                    setUser(initialState);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);

                    dispatch(
                        setFeedback({
                            setUser: {
                                status: FEEDBACK_STATUS.ERROR,
                                message: 'Invalid user.',
                            },
                        })
                    );
                    break;
            }
        });
    } catch (error) {
        console.warn('Error on sign in user.');
        console.error(error);

        dispatch(
            setFeedback({
                setUser: {
                    status: FEEDBACK_STATUS.ERROR,
                    message: 'Invalid user.',
                },
            })
        );
    }
};

function getUser(): Promise<User> {
    return Auth.currentAuthenticatedUser().then((authUser: AuthUser) => {
        const identities = JSON.parse(
            authUser.attributes.identities
        ) as Identities;
        const [identity] = identities;
        const { userId } = identity;
        const user: User = {
            id: parseInt(userId, 10),
            name: authUser.username,
            email: authUser.attributes.email,
        };
        return user;
    });
}

export default signInUser;
