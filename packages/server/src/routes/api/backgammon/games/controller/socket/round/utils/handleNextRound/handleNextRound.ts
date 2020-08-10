import { EVENTS, OPPONENT, Round } from 'types/lib/backgammon';
import { rollDices } from '../../../utils';
import { calculateGameOver, calculateSkipRound } from './utils';

export default async function handleNextRound(
    socket: SocketIO.Socket,
    round: Round
) {
    const [shouldGameOver, shouldSkipRound] = await Promise.all([
        calculateGameOver(round),
        calculateSkipRound(round),
    ]);

    if (shouldGameOver) {
        socket.emit(EVENTS.GAME_OVER, shouldGameOver);
    } else if (shouldSkipRound) {
        socket.emit(EVENTS.SKIP_ROUND, {
            round,
            message: 'You can not move. Skipping to next round.',
        });

        setTimeout(async () => {
            round.player = OPPONENT[round.player];
            round.turn += 1;
            round.dice = await rollDices();

            handleNextRound(socket, round);
        }, 1500);
    } else {
        // Send round.
        socket.emit(EVENTS.ROUND, round);
    }
}
