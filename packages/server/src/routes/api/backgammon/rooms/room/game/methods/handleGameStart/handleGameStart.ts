import { EmitGameStart } from '@shared-types/backgammon';
import BackgammonGame from '../../game';
import { checkPlayersFull } from '../../helpers';

export default function handleGameStart(
    this: BackgammonGame,
    payload: EmitGameStart
) {
    this.players = payload;

    const playersFull = checkPlayersFull(this.players);

    // Player disconnected once and now reconnected,
    // before disconnect time out.
    if (playersFull && this._status === 'INITIALIZED')
        this._handlePlayerReconnect();
    // One of the players already requested start/restart game,
    // and the other player is requested the same.
    else if (playersFull && this._status === 'START')
        this._setStatus('INITIALIZED');
    else {
        // Game was over and one of the players requested
        // to restart the game.
        if (playersFull && this._status === 'OVER')
            this._resetGame(this.players);

        // Only one of the player(s) requested start/restart the game.
        // So will wait for the other player.
        this._setStatus('START');
    }
}
