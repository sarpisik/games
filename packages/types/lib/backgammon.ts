import { User } from './user';

export type CreateGame = Pick<Game, "players" | "stages" | "duration">;

export interface EmitError {
    message: string;
    type: EVENTS;
}

export type EmitGameOver = (EmitScore | EmitStageOver) & {
    lose?: User["id"];
};

export type EmitGameStart = Game["players"];

export type EmitScore = EmitStageOver &
    Pick<Game, "score" | "stages"> & { rounds?: Game["rounds"] };

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

export interface EmitBase {
    gameId: Game["id"];
}

export interface GameClient extends Omit<Game, "rounds"> {
    isRoundPlayer: boolean;
    rounds: GameClientRound[];
    chat: GameClientChat;
}

interface GameClientChat {
    status: "ERROR" | "SUCCESS" | "SENDING";
    messages: GameClientMessage[];
}

export interface GameClientMessage {
    name: string;
    message: string;
    time: string;
}

interface GameClientRound extends Round {
    availableTriangles: number[];
    loading: boolean;
}

export interface GameServerSide extends Game {
    t?: Round["player"];
    tRef?: NodeJS.Timeout;
}

export interface Game {
    id: number;
    players: UsersMap;
    score: PlayersMap;
    stages: number;
    duration: number;
    timer: PlayersMap;
    rounds: Round[];
    _status: "UNINITIALIZED" | "INITIALIZED" | "OVER" | "START" | "SURRENDER";
}

interface UsersMap {
    [PLAYERS.WHITE]: User | null;
    [PLAYERS.BLACK]: User | null;
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

export const OPPONENT = {
    [PLAYERS.WHITE]: PLAYERS.BLACK,
    [PLAYERS.BLACK]: PLAYERS.WHITE,
} as const;

export enum EVENTS {
    ROUND = "ROUND",
    TIMER = "TIMER",
    SHORT_TIMER = "SHORT_TIMER",
    STAGE_OVER = "STAGE_OVER",
    GAME_OVER = "GAME_OVER",
    GAME_UPDATE = "GAME_UPDATE",
    GAME_NOT_FOUND = "GAME_NOT_FOUND",
    INVALID_DICE = "INVALID_DICE",
    INVALID_TRIANGLE = "INVALID_TRIANGLE",
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
