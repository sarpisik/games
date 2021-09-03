import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../game';

export default async function handleUndoRound(this: BackgammonGame) {
    await this._undoRound();

    this._emitNamespace(GAME_EVENTS.UNDO_ROUND, this.rounds);
}
