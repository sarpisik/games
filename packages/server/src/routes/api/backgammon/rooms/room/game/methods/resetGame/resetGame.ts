import BackgammonGame from '../../game';
import { generatePlayersObj } from '../../helpers';

export default function resetGame(
    this: BackgammonGame,
    players: BackgammonGame['players'] = generatePlayersObj(null, null)
) {
    // Reset game server side
    this.duration = this.duration || 60;
    this.players = players;
    this.timer = generatePlayersObj(this.duration, this.duration);
    this.stages = this.stages || 1;
    this.score = generatePlayersObj(0, 0);
    this.rounds = [];
    // Clear timers
    this._tRef && clearTimeout(this._tRef);
    delete this._t;
}
