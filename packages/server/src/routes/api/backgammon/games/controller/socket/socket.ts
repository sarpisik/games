import { EVENTS } from 'types/lib/backgammon';
import { handleBrokenPoint } from './handleBrokenPoint';
import { handleCollectPoint } from './handleCollectPoint';
import { handleUndoRound } from './handleUndoRound';
import { round } from './round';

export default function handleSocket(io: SocketIO.Namespace) {
    return function onConnection(socket: SocketIO.Socket) {
        console.log('client connected');

        socket.on(EVENTS.JOIN_ROOM, (roomName: string) => {
            socket.join(roomName);
            const roomSocket = socket.to(roomName);
            roomSocket.on(EVENTS.ROUND, round(roomSocket));
            roomSocket.on(
                EVENTS.BROKEN_POINT_ROUND,
                handleBrokenPoint(roomSocket)
            );
            roomSocket.on(
                EVENTS.COLLECT_POINT_ROUND,
                handleCollectPoint(roomSocket)
            );
            roomSocket.on(EVENTS.UNDO_ROUND, handleUndoRound(roomSocket));
        });
    };
}
