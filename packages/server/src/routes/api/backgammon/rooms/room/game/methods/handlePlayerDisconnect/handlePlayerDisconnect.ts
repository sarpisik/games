import { User } from '@shared-backgammon/src/types/user';
import { EmitGameOver, PLAYERS } from '@shared-types/backgammon';
import { ONE_SECOND, DISCONNECT_PLAYER_TIMEOUT } from '@shared-types/constants';
import { GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import BackgammonGame from '../../game';
import { SCORES } from '../../constants';

export default function handlePlayerDisconnect(
    this: BackgammonGame,
    user: Pick<User, 'id' | 'name'>,
    secondsLeft = DISCONNECT_PLAYER_TIMEOUT
) {
    const { id, name } = user;
    const players = Object.values(
        this.players
    ) as typeof this.players[keyof typeof this.players][];
    const disconnectedPlayer = players.find((p) => p?.id === id);

    // If user come backs, break timer.
    // ELse if, timeout, handle scores.
    // Else, continue timer.
    if (disconnectedPlayer) this._emitNamespace(GAME_EVENTS.NOTIFICATION, '');
    else {
        this._tRef && clearTimeout(this._tRef);
        if (secondsLeft < 1) {
            const winnerPlayer = players.find((p) => {
                if (p) return p.id !== id;
                return false;
            }) as Exclude<typeof players[number], null>;

            // If winner is still connected, handle both of them score calculations.
            // Else, set lose player score only.
            if (winnerPlayer) {
                logger.info(
                    `Disconnected player's name is ${name} and the id: ${id}.`
                );

                logger.info(
                    `Winner player's name is ${winnerPlayer.name} and the id ${winnerPlayer.id}.`
                );

                const winner =
                    this.players[PLAYERS.BLACK]?.id === winnerPlayer.id
                        ? PLAYERS.BLACK
                        : PLAYERS.WHITE;
                const payload: EmitGameOver = { winner, lose: id };

                this._setStatus('OVER', payload);
            } else {
                this._updatePlayerScore({
                    action: 'LOSE',
                    playerId: id,
                    _score: SCORES.ESCAPE,
                });
                this._setStatus('UNINITIALIZED');
            }
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
}

export function createMessage(name: string, seconds: number) {
    return `Player ${name} disconnected. Game will be over in ${seconds} seconds. Please wait.`;
}
