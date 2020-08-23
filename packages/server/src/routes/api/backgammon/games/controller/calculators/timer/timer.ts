import {
    EmitStageOver,
    Game,
    Round,
    OPPONENT,
    EVENTS,
} from '@shared-types/backgammon';
import { nmrToStr } from '../utils';

const EVERY_SECOND = 1000;

export default async function recursivelySetTimer(
    socket: SocketIO.Namespace,
    game: Game,
    gameOverCb: (
        roomName: string,
        gameId: number,
        payload: EmitStageOver
    ) => Promise<void>
) {
    const roundPlayer = game?.t;

    if (verifyRoundPlayer(roundPlayer)) {
        game.timer[roundPlayer] -= 1;

        if (game.timer[roundPlayer] < 1) {
            // Exit loop on game over.
            const gameId = game.id;
            const roomName = await nmrToStr(gameId);
            const winner = OPPONENT[roundPlayer];

            gameOverCb(roomName, gameId, { winner });
        } else {
            socket.emit(EVENTS.TIMER, game.timer);

            setTimeout(() => {
                recursivelySetTimer(socket, game, gameOverCb);
            }, EVERY_SECOND);
        }
    }
}

function verifyRoundPlayer(tested: Game['t']): tested is Round['player'] {
    return typeof tested !== 'undefined';
}
