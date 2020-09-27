import { addMessage } from '../../../../../../slices';
import { store } from '../../../../../../store';

type Store = typeof store;

export default function onUserNotFoundChat(s: Store) {
    return function gameOver(time: number) {
        s.dispatch(addMessage(setStatus(setMessage(s.getState(), time))));
    };
}

function setMessage(state: ReturnType<Store['getState']>, time: number) {
    const { user } = state;
    const message = `Error, could not send your message. Reason: user not found by id ${user.id}.`;

    return { name: user.name, message, time };
}

function setStatus(message: ReturnType<typeof setMessage>) {
    return { status: 'ERROR', message } as const;
}
