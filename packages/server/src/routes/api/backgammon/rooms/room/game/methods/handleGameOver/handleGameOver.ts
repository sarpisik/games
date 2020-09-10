import { EmitGameOver } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function handleGameOver(
    this: BackgammonGame,
    payload: EmitGameOver
) {
    // Edit players scores in db
    this._handlePlayersScore(payload);

    // Notify client
    this._emitNamespace(GAME_EVENTS.GAME_OVER, payload);
}
