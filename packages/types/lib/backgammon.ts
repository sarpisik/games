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
    id: string;
    white: string;
    black: string; // Will be player id
    rounds: Round[];
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

export const OPPONENT = {
    [PLAYERS.WHITE]: PLAYERS.BLACK,
    [PLAYERS.BLACK]: PLAYERS.WHITE,
} as const;

export enum EVENTS {
    ROUND = "ROUND",
    BROKEN_POINT_ROUND = "BROKEN_POINT_ROUND",
    COLLECT_POINT_ROUND = "COLLECT_POINT_ROUND",
    SKIP_ROUND = "SKIP_ROUND",
    UNDO_ROUND = "UNDO_ROUND",
    INITIAL_GAME = "INITIAL_GAME",
}

export enum STAGES {
    COLLECT = "COLLECT",
    MOVE = "MOVE",
}
