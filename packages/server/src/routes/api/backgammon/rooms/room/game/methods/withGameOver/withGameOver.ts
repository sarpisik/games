import { EmitBase } from '@shared-types/backgammon';
import BackgammonGame from '../../game';
import { GAME_EVENTS } from '@shared-types/game';

export default function withGameOver<Data extends EmitBase>(
    this: BackgammonGame,
    socket: SocketIO.Socket,
    eventHandler: (data: Data) => unknown
) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return async function gameOver(data: Data) {
        if (self._status === 'OVER') socket.emit(GAME_EVENTS.ACTION_AFTER_OVER);
        else return eventHandler.call(self, data);
    };
}
