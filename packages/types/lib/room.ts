export enum ROOM_EVENTS {
    NEW_USER = "NEW_USER",
    JOIN_ROOM = "JOIN_ROOM",
    JOIN_ROOMS = "JOIN_ROOMS",
}

export type EmitJoinRooms = EmitJoinRoom[];
export type EmitJoinRoom = number;

enum ROOM_TYPE {
    ROOM = "ROOM",
    GAME = "GAME",
}
