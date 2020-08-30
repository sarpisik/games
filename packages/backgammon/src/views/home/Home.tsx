import React from 'react';
import Button from 'react-bootstrap/Button';
import { useUser } from '../../app/slices';

export default function Home(): React.ReactElement {
    const { signIn } = useUser();

    return (
        <React.Fragment>
            <Button variant="primary" onClick={signIn}>
                Sign in
            </Button>
        </React.Fragment>
    );
}
