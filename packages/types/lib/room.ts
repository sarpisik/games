import { GameClient } from "./backgammon";

export enum ROOM_EVENTS {
    NEW_USER = "NEW_USER",
    DISCONNECT_USER = "DISCONNECT_USER",
    JOIN_ROOM = "JOIN_ROOM",
    EDIT_GAME = "EDIT_GAME",
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
}

export type EmitJoinRoom = number;
export type OnEditGame = EmitEditGame &
    Pick<GameClient, "score"> & { roomId: number };
export type EmitEditGame = Pick<
    GameClient,
    "id" | "duration" | "players" | "stages"
>;
