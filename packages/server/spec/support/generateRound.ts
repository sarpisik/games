import { layout } from '@routes/api/backgammon/rooms/room/game/constants';
import { Round } from '@shared-types/backgammon';
import generateBrokens from './generateBrokens';

export const generateRound = (
    player: Round['player'],
    dice = [2, 5]
): Round => ({
    id: Date.now(),
    player,
    layout,
    attempt: 1,
    turn: 1,
    brokens: generateBrokens(0, 0),
    collected: generateBrokens(0, 0),
    dice,
});
