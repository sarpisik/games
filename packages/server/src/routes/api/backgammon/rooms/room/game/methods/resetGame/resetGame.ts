import BackgammonGame from '../../game';
import { generatePlayersObj } from '../../helpers';

export default function resetGame(this: BackgammonGame) {
    this._status = 'UNINITIALIZED';
    this.duration = this.duration || 60;
    this.players = generatePlayersObj(null, null);
    this.timer = generatePlayersObj(this.duration, this.duration);
    this.stages = this.stages || 1;
    this.score = generatePlayersObj(0, 0);
    this.rounds = [];
}
