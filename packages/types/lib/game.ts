import { Game } from "./backgammon";

export enum GAME_EVENTS {
    // ROOM
    JOIN_GAME = "JOIN_GAME",

    // USERS
    DISCONNECT_USER = "DISCONNECT_USER",
    DISCONNECT_PLAYER = "DISCONNECT_PLAYER",

    // GAME LOGIC
    INITIALIZE_GAME = "INITIALIZE_GAME",
    ROUND = "ROUND",
    BROKEN_POINT_ROUND = "BROKEN_POINT_ROUND",
    COLLECT_POINT_ROUND = "COLLECT_POINT_ROUND",
    STAGE_OVER = "STAGE_OVER",
    SKIP_ROUND = "SKIP_ROUND",
    UNDO_ROUND = "UNDO_ROUND",

    // ERRORS
    ERROR = "ERROR",
    BAD_REQUEST = "BAD_REQUEST",

    // TIMERS
    SHORT_TIMER = "SHORT_TIMER",
    TIMER = "TIMER",
}

export type EmitGame = Game;
