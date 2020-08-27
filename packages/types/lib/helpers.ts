import { SOCKET_BACKGAMMON } from "./constants";

export function generateBackgammonRoomPath(roomId: number) {
    return SOCKET_BACKGAMMON.concat(`/${roomId}`);
}
