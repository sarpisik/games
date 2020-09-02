import { layout } from '../../constants';
import BackgammonGame from '../../game';
import { generatePlayersObj } from '../../helpers';
import { Round } from '../../round';

export default function initializeRound(
    this: BackgammonGame,
    roundPlayer: Round['player']
) {
    const brokens = generatePlayersObj(0, 0);
    const collected = generatePlayersObj(0, 0);
    const round = new Round(0, 1, roundPlayer, brokens, collected, layout);
    this._emitNextRound(round);
}
