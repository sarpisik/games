import { EmitUndoRound, EVENTS } from 'types/lib/backgammon';

export default function handleUndoRound(socket: SocketIO.Socket) {
    return function undoRound(rounds: EmitUndoRound) {
        const length = rounds.length;
        const shouldUndo =
            length > 0 &&
            rounds[length - 1]?.player === rounds[length - 2]?.player;
        shouldUndo && rounds.pop();

        socket.emit(EVENTS.UNDO_ROUND, rounds);
    };
}
