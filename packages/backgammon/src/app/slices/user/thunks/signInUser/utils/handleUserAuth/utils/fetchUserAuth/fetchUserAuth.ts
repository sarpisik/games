import { Auth } from 'aws-amplify';
import { User } from '../../../../../../../../../types/user';

interface AuthUser {
    username: string;
    attributes: Attributes;
}

interface Attributes {
    sub: string;
    identities: string;
    email_verified: boolean;
    email: string;
}
type Identities = Identity[];
interface Identity {
    userId: string;
    providerName: string;
    providerType: string;
    issuer?: any;
    primary: boolean;
    dateCreated: number;
}

export default function fetchUserAuth(): Promise<
    Pick<User, 'id' | 'email' | 'name'>
> {
    return Auth.currentAuthenticatedUser().then((authUser: AuthUser) => {
        const identities = JSON.parse(
            authUser.attributes.identities
        ) as Identities;
        const [identity] = identities;
        const { userId } = identity;
        const user: Pick<User, 'id' | 'email' | 'name'> = {
            id: userId,
            name: authUser.username,
            email: authUser.attributes.email,
        };
        return user;
    });
}
