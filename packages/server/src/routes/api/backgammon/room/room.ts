import { RoomType } from './types';
import { BackgammonGame } from './game';

export default class BackgammonRoom implements RoomType {
    games: RoomType['games'];

    constructor(public id: number) {
        this.games = [];
        for (let i = 1; i <= 10; i++) {
            this.games.push(new BackgammonGame(i));
        }
    }
}
