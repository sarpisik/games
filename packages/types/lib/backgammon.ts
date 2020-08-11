export type CreateGame = Pick<Game, "players" | "stages">;

export interface EmitGameOver {
    winner: PLAYERS;
}

export type EmitSignInUser = Pick<Game, "id" | "players">;

export type EmitBrokenPointRound = Omit<EmitRound, "fromTriangleIndex">;

export type EmitCollectPointRound = Omit<EmitRound, "toTriangleIndex">;

export type EmitUndoRound = Round[];

export interface EmitRound {
    fromTriangleIndex: number;
    toTriangleIndex: number;
    color: keyof Pick<typeof PLAYERS, "BLACK" | "WHITE">;
    round: Round;
}

export interface Game {
    id: number;
    players: Players;
    score: Score;
    stages: number;
    rounds: Round[];
}

interface Players {
    // Will be user ids
    white: number;
    black: number;
}

interface Score {
    white: number;
    black: number;
}

export interface Round {
    id: number;
    attempt: number;
    turn: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    brokens: Brokens;
    collected: Brokens;
    dice: number[];
    layout: number[][];
}

interface Brokens {
    [PLAYERS.WHITE]: number;
    [PLAYERS.BLACK]: number;
}

export enum PLAYERS {
    WHITE = -1,
    NONE = 0,
    BLACK = 1,
}

export interface User {
    id: number;
}

export const OPPONENT = {
    [PLAYERS.WHITE]: PLAYERS.BLACK,
    [PLAYERS.BLACK]: PLAYERS.WHITE,
} as const;

export enum EVENTS {
    ROUND = "ROUND",
    GAME_OVER = "GAME_OVER",
    GAME_UPDATE = "GAME_UPDATE",
    BROKEN_POINT_ROUND = "BROKEN_POINT_ROUND",
    COLLECT_POINT_ROUND = "COLLECT_POINT_ROUND",
    SKIP_ROUND = "SKIP_ROUND",
    UNDO_ROUND = "UNDO_ROUND",
    INITIAL_GAME = "INITIAL_GAME",
    JOIN_ROOM = "JOIN_ROOM",
    SIGN_IN_USER = "SIGN_IN_USER",
}

export enum STAGES {
    COLLECT = "COLLECT",
    MOVE = "MOVE",
}
