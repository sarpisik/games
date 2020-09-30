import { setRoundPlayer } from '../../../../../../../../slices';
import { calculateIsRoundPlayer } from '../../../../../../utils';
import { withDynamicLayout } from './withDynamicLayout';

export default withDynamicLayout(function onSetRoundPlayer(
    state,
    dispatch,
    round
) {
    dispatch(
        setRoundPlayer(
            calculateIsRoundPlayer(
                state.user.id,
                state.game.players,
                round.player
            )
        )
    );

    return round;
});
