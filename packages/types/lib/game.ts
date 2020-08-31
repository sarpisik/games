import { Game } from "./backgammon";

export enum GAME_EVENTS {
    JOIN_GAME = "JOIN_GAME",
    DISCONNECT_USER = "DISCONNECT_USER",
    DISCONNECT_PLAYER = "DISCONNECT_PLAYER",
    INITIALIZE_GAME = "INITIALIZE_GAME",
    ROUND = "ROUND",
}

export type EmitGame = Game;
