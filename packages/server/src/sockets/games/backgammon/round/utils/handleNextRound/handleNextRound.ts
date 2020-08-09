import io from 'socket.io';
import { OPPONENT, Round, EVENTS } from 'types/lib/backgammon';
import { rollDices } from '../../../utils';
import { calculateSkipRound, calculateGameOver } from './utils';

export default async function handleNextRound(socket: io.Socket, round: Round) {
    const shouldGameOver = await calculateGameOver(round);
    const shouldSkipRound = calculateSkipRound(round);

    if (shouldGameOver) {
        socket.emit(EVENTS.GAME_OVER, shouldGameOver);
    } else if (shouldSkipRound) {
        socket.emit(EVENTS.SKIP_ROUND, {
            round,
            message: 'You can not move. Skipping to next round.',
        });

        setTimeout(() => {
            round.player = OPPONENT[round.player];
            round.turn += 1;
            round.dice = rollDices();

            handleNextRound(socket, round);
        }, 1500);
    } else {
        // Send round.
        socket.emit(EVENTS.ROUND, round);
    }
}
