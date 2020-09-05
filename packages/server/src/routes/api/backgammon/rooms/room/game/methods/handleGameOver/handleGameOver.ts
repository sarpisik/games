import { EmitStageOver } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default function handleGameOver(
    this: BackgammonGame,
    payload: EmitStageOver
) {
    this._status = 'OVER';

    // Edit players scores in db
    this._handlePlayersScore(payload.winner);

    // Notify client
    this._emitNamespace(GAME_EVENTS.GAME_OVER, payload);
}
