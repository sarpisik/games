import { addRound } from '../../../../../../slices';
import { withDeleteNotification } from '../../../../utils';
import { onSetRoundPlayer } from '../shared';

type Round = Parameters<typeof addRound>[0];

export default withDeleteNotification(function onRound(store) {
    return function round(_round: Round) {
        store.dispatch(addRound(onSetRoundPlayer(store, _round)));
    };
});
