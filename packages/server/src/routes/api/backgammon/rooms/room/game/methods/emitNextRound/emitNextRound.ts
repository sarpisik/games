import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { Round } from '../../round';

export default function emitNextRound(this: BackgammonGame, round: Round) {
    this.rounds.push(round);
    this._emitNamespace(GAME_EVENTS.ROUND, round);
}
