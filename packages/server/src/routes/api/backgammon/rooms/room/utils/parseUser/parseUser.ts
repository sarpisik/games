import { ConnectedUser } from '../../../shared/socketConnection';

export default function parseUser(data: ConnectedUser) {
    return data.user;
}
