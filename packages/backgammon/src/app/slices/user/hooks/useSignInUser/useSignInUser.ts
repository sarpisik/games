import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../thunks';

export default function useSignInUser() {
    const dispatch = useDispatch();

    useEffect(
        function signInOnMounted() {
            dispatch(signInUser());
        },
        // skip dep dispatch
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
}
