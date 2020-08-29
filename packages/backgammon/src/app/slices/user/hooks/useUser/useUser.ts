import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function useUser() {
    const user = useSelector(selector);

    return {
        user,
        signIn() {
            Auth.federatedSignIn();
        },
        signOut() {
            Auth.signOut();
        },
    };
}

function selector(state: RootState) {
    return state.user;
}
