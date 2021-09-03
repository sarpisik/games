import { GameClient } from 'types/lib/backgammon';
import { setTimer } from '../../../../../../slices';
import { withTimer } from '../shared';

export default withTimer(function onTimer(store) {
    return function timer(game: GameClient['timer']) {
        store.dispatch(setTimer(game));
    };
});
