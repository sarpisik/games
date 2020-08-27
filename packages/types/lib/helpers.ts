import { SOCKET_BACKGAMMON } from "./constants";

export function generateBackgammonGamePath(roomId: number, gameId: number) {
    return mergePath(generateBackgammonRoomPath(roomId), gameId);
}
export function generateBackgammonRoomPath(roomId: number) {
    return mergePath(SOCKET_BACKGAMMON, roomId);
}
function mergePath<T>(pathPrefix: string, subPath: T) {
    return pathPrefix.concat(`/${subPath}`);
}
