import { GameClient } from "./backgammon";

export enum ROOM_EVENTS {
    NEW_USER = "NEW_USER",
    JOIN_ROOM = "JOIN_ROOM",
    EDIT_GAME = "EDIT_GAME",
}

export type EmitJoinRooms = EmitJoinRoom[];
export type EmitJoinRoom = number;
export type EmitEditGame = Pick<
    GameClient,
    "id" | "duration" | "players" | "stages"
>;
