import { User } from '../../../../../../../../types/user';

export default function transformToInitialstate(
    user: User
): Pick<User, 'name'> & { description: Exclude<User['description'], null> } {
    const { name, description } = user;
    return { name, description: description || '' };
}
