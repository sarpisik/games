import { BackgammonGame } from './game';

export interface RoomType {
    id: number;
    games: BackgammonGame[];
}
