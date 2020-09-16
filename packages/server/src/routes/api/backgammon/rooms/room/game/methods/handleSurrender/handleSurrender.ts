import { PLAYERS } from '@shared-types/backgammon';
import { EmitSurrender, GAME_EVENTS } from '@shared-types/game';
import logger from '@shared/Logger';
import BackgammonGame from '../../game';

export default function handleSurrender(
    this: BackgammonGame,
    data: EmitSurrender
) {
    switch (data.type) {
        case 'REQUEST':
            this._emitNamespace(GAME_EVENTS.SURRENDER, data);
            break;

        case 'REJECT': {
            this._emitNamespace(GAME_EVENTS.SURRENDER, data);
            setTimeout(() => {
                this._status = 'INITIALIZED';
                this._handleTimer();
            }, 2000);
            break;
        }

        case 'ACCEPT': {
            const acceptedPlayerId = data.payload.id;
            const players = this.players;
            const winnerIndex =
                players[PLAYERS.BLACK]?.id === acceptedPlayerId
                    ? PLAYERS.BLACK
                    : PLAYERS.WHITE;
            const round = this.rounds[this.rounds.length - 1];

            // Increase collected so that stage will be over.
            round.collected[winnerIndex] = 15;
            this._handleNextRound(round);
            break;
        }

        default:
            logger.error(`Invalid surrender data type. Received ${data.type}.`);
            break;
    }
}
