import { EmitScore } from 'types/lib/backgammon';
import { editGame } from '../../../../../../slices';
import { store } from '../../../../../../store';

export default function onStageOver(s: typeof store) {
    return function stageOver(data: EmitScore) {
        const { winner, ..._game } = data;
        // @ts-ignore
        s.dispatch(editGame(_game));
    };
}
