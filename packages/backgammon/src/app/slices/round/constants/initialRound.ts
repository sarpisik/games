import { PLAYERS } from '../../../../components/Board/constants';

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
