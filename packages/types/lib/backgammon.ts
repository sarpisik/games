export type CreateGame = Pick<Game, "players" | "stages">;

export interface EmitError {
    message: string;
    type: EVENTS;
}

export type EmitGameOver = EmitStageOver;

export interface EmitStageOver {
    winner: PLAYERS.BLACK | PLAYERS.WHITE;
}

export type EmitSignInUser = Pick<Game, "id" | "players">;

export type EmitBrokenPointRound = Omit<EmitRound, "fromTriangleIndex">;

export type EmitCollectPointRound = Omit<EmitRound, "toTriangleIndex">;

export type EmitUndoRound = EmitBase;

export interface EmitRound extends EmitBase {
    fromTriangleIndex: number;
    toTriangleIndex: number;
    color: keyof Pick<typeof PLAYERS, "BLACK" | "WHITE">;
    roundId: Round["id"];
}

interface EmitBase {
    gameId: Game["id"];
}

export interface GameClient extends Game {
    isRoundPlayer: boolean;
}

export interface Game {
    id: number;
    players: PlayersMap;
    score: PlayersMap;
    stages: number;
    rounds: Round[];
}

interface PlayersMap {
    [PLAYERS.WHITE]: number;
    [PLAYERS.BLACK]: number;
}

export interface Round {
    id: number;
    attempt: number;
    turn: number;
    player: PLAYERS.WHITE | PLAYERS.BLACK;
    brokens: PlayersMap;
    collected: PlayersMap;
    dice: number[];
    layout: number[][];
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
    STAGE_OVER = "STAGE_OVER",
    GAME_OVER = "GAME_OVER",
    GAME_UPDATE = "GAME_UPDATE",
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
    ERROR = "ERROR",
    BAD_REQUEST = "BAD_REQUEST",
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
