import { GameClient } from 'types/lib/backgammon';
import {
    checkPlayerIsBlack,
    checkUserIsPlayer,
} from '../../../../../../../../../../utils';
import { store } from '../../../../../../../../../store';

type Store = typeof store;
type State = ReturnType<Store['getState']>;
type Round = GameClient['rounds'][number];

export default function withDynamicLayout<Return>(
    wrappedFunc: (
        state: State,
        dispatch: Store['dispatch'],
        round: Round
    ) => Return
) {
    return function dynamicLayout(
        store: Store,
        round: Parameters<typeof wrappedFunc>[2]
    ) {
        const state = store.getState();

        return wrappedFunc(
            state,
            store.dispatch,
            reverseLayoutOnBlack(handleDynamicLayout(state), round)
        );
    };
}

function handleDynamicLayout(state: State) {
    const { game, user } = state;
    const { players } = game;
    const { id } = user;

    return checkPlayerIsBlack(id, players, checkUserIsPlayer(players, id));
}

function reverseLayoutOnBlack(shouldReverse: boolean, round: Round): Round {
    if (shouldReverse) {
        round.layout = round.layout.reverse();
    }
    return round;
}
