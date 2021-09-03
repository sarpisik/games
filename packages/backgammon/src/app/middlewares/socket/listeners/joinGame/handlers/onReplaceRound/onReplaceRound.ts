import { replaceRound } from '../../../../../../slices';
import { withDeleteNotification } from '../../../../utils';
import { onSetRoundPlayer } from '../shared';

export default withDeleteNotification(function onReplaceRound(store) {
    return function _replaceRound(round: Parameters<typeof replaceRound>[0]) {
        store.dispatch(replaceRound(onSetRoundPlayer(store, round)));
    };
});
