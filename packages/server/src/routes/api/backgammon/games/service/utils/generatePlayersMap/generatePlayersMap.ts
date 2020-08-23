import { PLAYERS } from '@shared-types/backgammon';

export default function generatePlayersMap<T>(p1: T, p2: T) {
    return { [PLAYERS.BLACK]: p2, [PLAYERS.WHITE]: p1 };
}
