export enum ROOM_EVENTS {
    NEW_USER = "NEW_USER",
    JOIN_ROOM = "JOIN_ROOM",
    JOIN_ROOMS = "JOIN_ROOMS",
}

export interface EmitJoinRoom {
    type: ROOM_TYPE;
    id: number;
}

enum ROOM_TYPE {
    ROOM = "ROOM",
    GAME = "GAME",
}
