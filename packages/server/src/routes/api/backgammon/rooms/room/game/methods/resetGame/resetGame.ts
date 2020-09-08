import BackgammonGame from '../../game';
import { generatePlayersObj, reduceGameProps } from '../../helpers';
import { GAME_EVENTS } from '@shared-types/game';

export default function resetGame(this: BackgammonGame) {
    // Reset game server side
    this._status = 'UNINITIALIZED';
    this.duration = this.duration || 60;
    this.players = generatePlayersObj(null, null);
    this.timer = generatePlayersObj(this.duration, this.duration);
    this.stages = this.stages || 1;
    this.score = generatePlayersObj(0, 0);
    this.rounds = [];
    // Clear timers
    this._tRef && clearTimeout(this._tRef);
    delete this._t;

    // Reset game client side
    this._emitNamespace(GAME_EVENTS.JOIN_GAME, reduceGameProps(this));
}
