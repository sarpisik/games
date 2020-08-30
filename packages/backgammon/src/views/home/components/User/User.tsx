import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../../../app/slices';
import { checkUser } from '../../../../utils';

export default function User(): React.ReactElement {
    const { user, signIn, signOut } = useUser();
    const userSignedIn = checkUser(user);

    return userSignedIn ? (
        <Button variant="outline-primary" onClick={signOut}>
            Sign out
        </Button>
    ) : (
        <Button variant="primary" onClick={signIn}>
            Sign in
        </Button>
    );
}
