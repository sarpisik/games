import io from 'socket.io';
import { BACKGAMMON_TYPES } from 'types';
import { rollDices } from './utils';
import { layout } from './constants';
import { EVENTS } from 'types/lib/backgammon';
import { round } from './round';

export default function bacgammon(socket: io.Socket) {
    // Generate initial game
    const initialGame: BACKGAMMON_TYPES.Game = {
        id: '',
        white: 'white_id',
        black: 'black_id',
        rounds: [
            {
                attempt: 0,
                player: BACKGAMMON_TYPES.PLAYERS.BLACK,
                turn: 1,
                brokens: {
                    [BACKGAMMON_TYPES.PLAYERS.WHITE]: 0,
                    [BACKGAMMON_TYPES.PLAYERS.BLACK]: 0,
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
}
