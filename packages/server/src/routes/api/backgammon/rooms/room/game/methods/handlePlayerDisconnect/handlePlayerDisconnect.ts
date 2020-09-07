import { User } from '@shared-backgammon/src/types/user';
import BackgammonGame from '../../game';
import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import { EmitStageOver, PLAYERS } from '@shared-types/backgammon';
import { SCORES } from '../../constants';
import { ONE_SECOND } from '@shared-types/constants';

export default function handlePlayerDisconnect(
    this: BackgammonGame,
    userId: User['id'],
    secondsLeft = 10
) {
    const players = Object.values(
        this.players
    ) as typeof this.players[keyof typeof this.players][];
    const disconnectedPlayer = players.find((p) => p?.id === userId);

    // If should break, handle scores.
    // Else, run timer.
    if (!disconnectedPlayer || secondsLeft < 1) {
        this._status = 'UNINITIALIZED';
        const winnerPlayer = players.find((p) => p?.id !== userId);

        // Winner
        if (winnerPlayer) {
            const winner =
                this.players[PLAYERS.BLACK]?.id === winnerPlayer.id
                    ? PLAYERS.BLACK
                    : PLAYERS.WHITE;
            const emitStageOver: EmitStageOver = { winner };

            // Notify client
            this._emitNamespace(GAME_EVENTS.GAME_OVER, emitStageOver);

            // Handle winner score
            this._updatePlayerScore('WIN', winnerPlayer.id, SCORES.WINNER);
        } else
            logger.error(
                'Winner player update score failed because of disconnected.'
            );

        // Escape
        if (disconnectedPlayer)
            // Handle escape score
            this._updatePlayerScore(
                'ESCAPE',
                disconnectedPlayer.id,
                SCORES.ESCAPE
            );
        else logger.error(`Disconnected player not found by id:${userId}`);
    } else {
        this._emitNamespace(
            GAME_EVENTS.NOTIFICATION,
            createMessage(disconnectedPlayer.name, secondsLeft)
        );

        this._tRef = setTimeout(() => {
            this._handlePlayerDisconnect(userId, secondsLeft - 1);
        }, ONE_SECOND);
    }
}

export function createMessage(name: string, seconds: number) {
    return `Player ${name} disconnected. Game will be over in ${seconds} seconds. Please wait.`;
}
