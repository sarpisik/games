import { addRound } from '../../../../../../slices';
import { store } from '../../../../../../store';
import { onSetRoundPlayer } from '../shared';

export default function onSkipRound(s: typeof store) {
    return function skipRound(round: Parameters<typeof addRound>[0]) {
        s.dispatch(addRound(onSetRoundPlayer(s, round)));
    };
}
