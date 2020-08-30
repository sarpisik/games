import { User } from 'types/lib/backgammon';

export default function checkUser(user: User) {
    return user.id !== '';
}
