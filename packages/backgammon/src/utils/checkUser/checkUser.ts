import { User } from 'types/lib/user';

export default function checkUser(user: User) {
    return user.id !== '';
}
