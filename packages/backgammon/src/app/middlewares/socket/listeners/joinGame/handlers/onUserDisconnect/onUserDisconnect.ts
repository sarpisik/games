import { store } from '../../../../../../store';

export default function onUserDisconnect(_s: typeof store) {
    return function userDisconnect(userName: string) {
        console.log(`${userName} disconnected.`);
    };
}
