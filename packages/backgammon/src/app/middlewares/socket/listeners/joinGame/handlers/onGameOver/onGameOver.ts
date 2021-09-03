import { EmitScore } from 'types/lib/backgammon';
import { editGame } from '../../../../../../slices';
import { store } from '../../../../../../store';

export default function onGameOver(s: typeof store) {
    return function gameOver(data: EmitScore) {
        const { winner, ..._game } = data;
        // @ts-ignore
        s.dispatch(editGame(Object.assign(_game, { _status: 'OVER' })));
    };
}
