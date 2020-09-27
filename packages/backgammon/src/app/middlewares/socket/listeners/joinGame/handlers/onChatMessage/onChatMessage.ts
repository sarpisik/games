import { addMessage } from '../../../../../../slices';
import { store } from '../../../../../../store';
import { ChatMessageServer } from 'types/lib/game';

type Store = typeof store;

export default function onChatMessage(s: Store) {
    return function chatMessage(message: ChatMessageServer) {
        s.dispatch(addMessage(setStatus(message)));
    };
}

function setStatus(message: ChatMessageServer) {
    return { status: 'ERROR', message } as const;
}
