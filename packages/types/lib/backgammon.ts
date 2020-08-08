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
    dice: number[];
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
