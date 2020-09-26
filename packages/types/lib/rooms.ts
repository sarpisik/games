export enum ROOMS_EVENTS {
    JOIN_ROOMS = "JOIN_ROOMS",
    DISCONNECT_ROOMS = "DISCONNECT_ROOMS",
}

export type EmitRooms = EmitRoom[];
interface EmitRoom {
    id: number;
    users: number;
}
