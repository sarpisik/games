import { API, graphqlOperation } from 'aws-amplify';
import Axios from 'axios';
import { CreateUserInput } from '../../../../../../../API';
import { createUser } from '../../../../../../../graphql/mutations';
import { User } from '../../../../../../../types/user';
import { fetchUserAuth, validateUser } from './utils';

export default async function handleUserAuth(
    setUserFetching: () => void,
    setUserSuccess: (user: User) => void,
    setUserError: () => void
) {
    setUserFetching();

    // Get auth credentials
    const userAuth = await fetchUserAuth();

    // Fetch user from db
    const response = await Axios.get('/api/users/' + userAuth.id);

    // @ts-ignore
    const user = response?.data;

    // If user is exist in db, dispatch.
    // Else, create a new user.
    if (validateUser(user)) setUserSuccess(user);
    else {
        const input: CreateUserInput = Object.assign({}, userAuth, {
            wins: 0,
            loses: 0,
            escapes: 0,
        });

        // Mutate new user.
        const _response = await API.graphql(
            graphqlOperation(createUser, { input })
        );

        // @ts-ignore
        const newUser = _response?.data?.createUser;

        if (validateUser(newUser)) setUserSuccess(newUser);
        else {
            console.log('Sign in to database failure', _response);
            setUserError();
        }
    }
}
