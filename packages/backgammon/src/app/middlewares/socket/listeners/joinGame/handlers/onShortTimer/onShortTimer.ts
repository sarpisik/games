import { setShortTimer } from '../../../../../../slices';
import { withTimer } from '../shared';

export default withTimer(function onShortTimer(store) {
    return function shortTimer(seconds: number) {
        store.dispatch(setShortTimer({ seconds }));
    };
});
