import React from 'react';
import Button from 'react-bootstrap/Button';
import { useFeedbacks, useUser } from '../../app/slices';
import { FEEDBACK_STATUS } from '../../app/slices/feedbacks/feedbacks';
import { checkUser } from '../../utils';

export default function withAuthorization<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithAuthorization(props: Props) {
        const feedback = useFeedbacks('setUser');
        const { user, signIn } = useUser();

        const userSignedIn = checkUser(user);
        if (userSignedIn) return <WrappedComponent {...props} />;

        switch (feedback.status) {
            case FEEDBACK_STATUS.FETCHING:
                return <p>Loading user...</p>;
            case FEEDBACK_STATUS.UNFETCH:
                return <p>Initializing fetch user data...</p>;
            case FEEDBACK_STATUS.ERROR:
                return (
                    <p>
                        Loading user failed. Please{' '}
                        <Button variant="link" onClick={signIn}>
                            sign in
                        </Button>
                        .
                    </p>
                );

            default:
                return null;
        }
    };
}
