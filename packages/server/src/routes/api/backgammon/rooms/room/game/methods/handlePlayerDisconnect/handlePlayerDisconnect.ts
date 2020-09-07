import { User } from '@shared-backgammon/src/types/user';
import BackgammonGame from '../../game';
import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import { EmitStageOver, PLAYERS } from '@shared-types/backgammon';
import { SCORES } from '../../constants';
import { ONE_SECOND } from '@shared-types/constants';

export default function handlePlayerDisconnect(
    this: BackgammonGame,
    user: Pick<User, 'id' | 'name'>,
    secondsLeft = 10
) {
    const { id, name } = user;
    const players = Object.values(
        this.players
    ) as typeof this.players[keyof typeof this.players][];
    const disconnectedPlayer = players.find((p) => p?.id === id);

    // If user come backs, break timer.
    // ELse if, timeout, handle scores.
    // Else, continue timer.
    if (disconnectedPlayer) this._tRef && clearTimeout(this._tRef);
    else if (secondsLeft < 1) {
        this._status = 'UNINITIALIZED';
        const winnerPlayer = players.find((p) => p?.id !== id);

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
        this._updatePlayerScore('ESCAPE', id, SCORES.ESCAPE);
    } else {
        this._emitNamespace(
            GAME_EVENTS.NOTIFICATION,
            createMessage(name, secondsLeft)
        );

        this._tRef = setTimeout(() => {
            this._handlePlayerDisconnect(user, secondsLeft - 1);
        }, ONE_SECOND);
    }
}

export function createMessage(name: string, seconds: number) {
    return `Player ${name} disconnected. Game will be over in ${seconds} seconds. Please wait.`;
}
