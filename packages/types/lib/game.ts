import { Game } from "./backgammon";
import { User } from './user';

export enum GAME_EVENTS {
    // ROOM
    JOIN_GAME = "JOIN_GAME",

    // USERS
    DISCONNECT_USER = "DISCONNECT_USER",
    DISCONNECT_PLAYER = "DISCONNECT_PLAYER",
    DISCONNECT_FROM_SERVER = "DISCONNECT_FROM_SERVER",

    // GAME LOGIC
    INITIALIZE_GAME = "INITIALIZE_GAME",
    STAGE_OVER = "STAGE_OVER",
    GAME_OVER = "GAME_OVER",
    START_GAME = "START_GAME",
    RESTART_GAME = "RESTART_GAME",

    // ROUND
    SURRENDER = "SURRENDER",
    ROUND = "ROUND",
    BROKEN_POINT_ROUND = "BROKEN_POINT_ROUND",
    COLLECT_POINT_ROUND = "COLLECT_POINT_ROUND",
    SKIP_ROUND = "SKIP_ROUND",
    UNDO_ROUND = "UNDO_ROUND",
    REPLACE_ROUND = "REPLACE_ROUND",

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
