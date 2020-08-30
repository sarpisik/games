import { User } from '../../../../../../../../../types/user';

export default function validateUser(user: User | null): user is User {
    return Boolean(user);
}
