import { PLAYERS } from '@shared-types/backgammon';

export default function generatePlayersObj<T>(b: T, w: T) {
    return { [PLAYERS.BLACK]: b, [PLAYERS.WHITE]: w };
}
