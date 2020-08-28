export enum ROOM_EVENTS {
    NEW_USER = "NEW_USER",
    JOIN_ROOM = "JOIN_ROOM",
    EDIT_GAME = "EDIT_GAME",
}

export type EmitJoinRooms = EmitJoinRoom[];
export type EmitJoinRoom = number;