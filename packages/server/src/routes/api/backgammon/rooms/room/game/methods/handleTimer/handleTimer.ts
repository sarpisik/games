import BackgammonGame from '../../game';

export default async function handleTimer(this: BackgammonGame) {
    const latestRound = this.rounds[this.rounds.length - 1];
    this._t = latestRound.player;

    this._recursivelySetShortTimer(latestRound.player);
}
