import { undoRound } from '../../../../../../slices';
import { withDeleteNotification } from '../../../../utils';
import { onSetRoundPlayer } from '../shared';

export default withDeleteNotification(function onUndoRound(store) {
    return function _undoRound(rounds: Parameters<typeof undoRound>[0]) {
        onSetRoundPlayer(store, rounds[rounds.length - 1]);
        store.dispatch(undoRound(rounds));
    };
});
