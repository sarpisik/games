import React from 'react';
import { CreateGame } from './components';
import { useUser } from '../../app/slices';

export default function Home(): React.ReactElement {
    const { signIn } = useUser();

    React.useEffect(function signInUserOnMounted() {
        signIn(Date.now());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <CreateGame />
        </div>
    );
}
