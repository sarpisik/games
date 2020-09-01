import { Round } from '@shared-types/backgammon';

export interface MovableParams {
    validDices: number[];
    layout: Round['layout'];
    startIndex: number;
    player: Round['player'];
}
