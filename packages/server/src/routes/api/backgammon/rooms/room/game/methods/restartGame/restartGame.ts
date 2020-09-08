import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import BackgammonGame from '../../game';
import { Round } from '../../round';

export default function restartGame(
    this: BackgammonGame,
    player: Round['player']
) {
    switch (this._status) {
        case 'OVER':
            this._setStatus('UNINITIALIZED');
            this._emitNamespace(GAME_EVENTS.RESTART_GAME, player);
            break;

        case 'UNINITIALIZED':
            this._initializeGame();
            break;

        default:
            logger.error(`Invalid game lifecycle on restart.`);
            break;
    }
}
