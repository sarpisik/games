import { checkPlayerIsBlack, checkUserIsPlayer } from '../../../../../utils';
import { useUserDocument } from '../../../user';
import { usePlayers } from '../usePlayers';
import { useRound } from '../useRound';

type Round = ReturnType<typeof useRound>;
type Players = ReturnType<typeof usePlayers>;
type User = ReturnType<typeof useUserDocument>;

export default function useLayout() {
    const round = useRound();
    const players = usePlayers();
    const user = useUserDocument();

    return reverseLayoutOnBlack(
        checkLayoutNeedsReverse(players, user),
        round?.layout || []
    );
}

function checkLayoutNeedsReverse(players: Players, user: User) {
    const { id } = user;
    return checkPlayerIsBlack(id, players, checkUserIsPlayer(players, id));
}
function reverseLayoutOnBlack(
    shouldReverse: boolean,
    layout: Round['layout']
): Round['layout'] {
    return shouldReverse ? [...layout].reverse() : layout;
}
