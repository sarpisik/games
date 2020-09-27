import { setRoundPlayer } from '../../../../../../../../slices';
import { store } from '../../../../../../../../store';
import { calculateIsRoundPlayer } from '../../../../../../utils';

const onSetRoundPlayer = <
    R extends { player: Parameters<typeof calculateIsRoundPlayer>[2] }
>(
    s: typeof store,
    round: R
) => {
    const state = s.getState();
    const { game, user } = state;

    s.dispatch(
        setRoundPlayer(
            calculateIsRoundPlayer(user.id, game.players, round.player)
        )
    );

    return round;
};

export default onSetRoundPlayer;
