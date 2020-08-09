import io from 'socket.io';
import { EVENTS, Game, PLAYERS } from 'types/lib/backgammon';
import { layout } from './constants';
import { handleBrokenPoint } from './handleBrokenPoint';
import { handleUndoRound } from './handleUndoRound';
import { round } from './round';
import { rollDices } from './utils';

export default function bacgammon(socket: io.Socket) {
    // Generate initial game
    const initialGame: Game = {
        id: '',
        white: 'white_id',
        black: 'black_id',
        rounds: [
            {
                attempt: 0,
                player: PLAYERS.WHITE,
                turn: 1,
                brokens: {
                    [PLAYERS.WHITE]: 0,
                    [PLAYERS.BLACK]: 0,
                },
                dice: rollDices(),
                id: Date.now(),
                layout,
            },
        ],
    };
    socket.on(EVENTS.INITIAL_GAME, () => {
        socket.emit(EVENTS.INITIAL_GAME, initialGame);
    });
    socket.on(EVENTS.ROUND, round(socket));
    socket.on(EVENTS.BROKEN_POINT_ROUND, handleBrokenPoint(socket));
    socket.on(EVENTS.UNDO_ROUND, handleUndoRound(socket));
}
