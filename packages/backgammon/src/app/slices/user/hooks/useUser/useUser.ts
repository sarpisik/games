import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { deleteUser, editUser } from '../../thunks';
import { useUserDocument } from '../useUserDocument';

export default function useUser() {
    const dispatch = useDispatch();
    const user = useUserDocument();

    return {
        user,
        signIn() {
            // @ts-ignore
            Auth.federatedSignIn({ provider: 'Google' });
        },
        signOut() {
            Auth.signOut();
        },
        editUser(user: Parameters<typeof editUser>[0]) {
            dispatch(editUser(user));
        },
        deleteUser() {
            dispatch(deleteUser());
        },
    };
}
