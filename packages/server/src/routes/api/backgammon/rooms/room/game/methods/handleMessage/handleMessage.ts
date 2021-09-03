import { User } from '@shared-backgammon/src/types/user';
import {
    ChatMessageServer,
    EmitMessage,
    GAME_EVENTS,
} from '@shared-types/game';
import BackgammonGame from '../../game';
import { sanitizeMessage } from './utils';

export default function handleMessage(
    this: BackgammonGame,
    socket: SocketIO.Socket
) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return function onMessage(data: EmitMessage) {
        let userData: User | undefined;

        const { id, message } = data,
            entries = self._users,
            time = Date.now();

        for (const entry of entries) {
            const [, _user] = entry;
            if (_user.user.id === id) {
                userData = _user.user;
                break;
            }
        }

        if (!userData) socket.emit(GAME_EVENTS.USER_NOT_FOUND_CHAT, time);
        else {
            const newMessage: ChatMessageServer = {
                name: userData.name,
                time,
                message: sanitizeMessage(message),
            };

            self._emitNamespace(GAME_EVENTS.MESSAGE, newMessage);
        }
    };
}
