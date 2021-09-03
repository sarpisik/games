import { GameClient } from 'types/lib/backgammon';
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

        return wrappedFunc(state, store.dispatch, round);
    };
}
