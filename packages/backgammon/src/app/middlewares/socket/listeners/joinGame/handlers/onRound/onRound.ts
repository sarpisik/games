import { addRound } from '../../../../../../slices';
import { withDeleteNotification } from '../../../../utils';
import { onSetRoundPlayer } from '../shared';

export default withDeleteNotification(function onRound(store) {
    return function round(_round: Parameters<typeof addRound>[0]) {
        store.dispatch(addRound(onSetRoundPlayer(store, _round)));
    };
});
