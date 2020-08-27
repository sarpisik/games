import { SOCKET_BACKGAMMON } from "./constants";

export function generateBackgammonGamePath<T>(roomId: T, gameId: T) {
    return mergePath(generateBackgammonRoomPath(roomId), gameId);
}
export function generateBackgammonRoomPath<T>(roomId: T) {
    return mergePath(SOCKET_BACKGAMMON, roomId);
}
function mergePath<T>(pathPrefix: string, subPath: T) {
    return pathPrefix.concat(`/${subPath}`);
}
