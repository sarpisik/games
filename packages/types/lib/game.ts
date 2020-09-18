import { Game, User } from "./backgammon";

export enum GAME_EVENTS {
    // ROOM
    JOIN_GAME = "JOIN_GAME",

    // USERS
    DISCONNECT_USER = "DISCONNECT_USER",
    DISCONNECT_PLAYER = "DISCONNECT_PLAYER",
    DISCONNECT_FROM_SERVER = "DISCONNECT_FROM_SERVER",

    // GAME LOGIC
    INITIALIZE_GAME = "INITIALIZE_GAME",
    ROUND = "ROUND",
    BROKEN_POINT_ROUND = "BROKEN_POINT_ROUND",
    COLLECT_POINT_ROUND = "COLLECT_POINT_ROUND",
    STAGE_OVER = "STAGE_OVER",
    GAME_OVER = "GAME_OVER",
    START_GAME = "START_GAME",
    RESTART_GAME = "RESTART_GAME",
    SKIP_ROUND = "SKIP_ROUND",
    UNDO_ROUND = "UNDO_ROUND",
    SURRENDER = "SURRENDER",

    // NOTIFICATIONS
    NOTIFICATION = "NOTIFICATION",
    MESSAGE = "MESSAGE",

    // ERRORS
    ERROR = "ERROR",
    BAD_REQUEST = "BAD_REQUEST",
    USER_NOT_FOUND_CHAT = "USER_NOT_FOUND_CHAT",

    // TIMERS
    SHORT_TIMER = "SHORT_TIMER",
    TIMER = "TIMER",
}

export type EmitGame = Game;

export interface EmitSurrender {
    type: "REQUEST" | "ACCEPT" | "REJECT";
    payload: Pick<User, "id">;
}

export interface EmitMessage extends Pick<User, "id">, Message {}

export interface ChatMessageServer extends Message {
    name: string;
    time: number;
}

interface Message {
    message: string;
}
