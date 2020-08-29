import React from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

export default function withAuthentication<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithAuthentication(props: Props): React.ReactElement {
        const [user, setUser] = React.useState<any>(null);

        React.useEffect(() => {
            Hub.listen('auth', ({ payload: { event, data } }) => {
                switch (event) {
                    case 'signIn':
                    case 'cognitoHostedUI':
                        getUser().then((userData) => setUser(userData));
                        break;
                    case 'signOut':
                        setUser(null);
                        break;
                    case 'signIn_failure':
                    case 'cognitoHostedUI_failure':
                        console.log('Sign in failure', data);
                        break;
                }
            });

            getUser().then((userData) => setUser(userData));
        }, []);

        function getUser() {
            return Auth.currentAuthenticatedUser()
                .then((userData) => userData)
                .catch((error) => {
                    console.error(error);
                    console.log('Not signed in');
                });
        }
        return (
            <React.Fragment>
                <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
                {user ? (
                    <button onClick={() => Auth.signOut()}>Sign Out</button>
                ) : (
                    <button onClick={() => Auth.federatedSignIn()}>
                        Federated Sign In
                    </button>
                )}
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
}
