import { PLAYERS } from '@shared-types/backgammon';
import { ONE_SECOND, SHORT_TIMER } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';
import { verifyRoundPlayer } from '../../helpers';

export default async function recursivelySetShortTimer(
    this: BackgammonGame,
    latestRoundPlayer: PLAYERS | undefined,
    seconds = SHORT_TIMER
) {
    const roundPlayer = this._t;

    if (roundPlayer === latestRoundPlayer && verifyRoundPlayer(roundPlayer)) {
        seconds -= 1;
        this._emitNamespace(GAME_EVENTS.SHORT_TIMER, seconds);

        if (seconds < 1) {
            this._recursivelySetTimer(latestRoundPlayer);
        } else {
            this._tRef = setTimeout(() => {
                this._recursivelySetShortTimer(latestRoundPlayer, seconds);
            }, ONE_SECOND);
        }
    }
}
