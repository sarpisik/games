import React from 'react';
import { useSignInUser } from '../../app/slices/user/hooks';

export default function withAuthentication<Props>(
    WrappedComponent: React.ComponentType<Props>
) {
    return function WithAuthentication(props: Props): React.ReactElement {
        useSignInUser();

        return <WrappedComponent {...props} />;
    };
}
