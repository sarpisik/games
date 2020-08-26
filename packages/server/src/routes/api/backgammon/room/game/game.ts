import { GameServerSide } from '@shared-types/backgammon';
import { generatePlayersObj } from './helpers';

export default class BackgammonGame implements GameServerSide {
    players: GameServerSide['players'];
    score: GameServerSide['score'];
    stages: GameServerSide['stages'];
    duration: GameServerSide['duration'];
    timer: GameServerSide['timer'];
    rounds: GameServerSide['rounds'];

    constructor(public id: number) {
        this.players = generatePlayersObj(-1, -1);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];
    }
}
