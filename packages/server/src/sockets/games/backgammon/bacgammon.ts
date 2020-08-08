import io from 'socket.io';
import { BACKGAMMON_TYPES } from 'types';
import { rollDices } from './utils';

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
            },
        ],
    };
    socket.emit('initialGame', initialGame);
}
