import BackgammonGame from '../../../game';
import { Params } from '../updatePlayerScore';

export default function withResetGame(
    wrappedFunction: (params: Params) => Promise<void>
) {
    return function WithResetGame(this: BackgammonGame, params: Params) {
        // If we are updating player score, then we can reset the game.
        this._resetGame();

        return wrappedFunction(params);
    };
}
