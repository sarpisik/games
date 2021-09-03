import { PLAYERS } from '@shared-types/backgammon';

export default function generateBrokens(w: number, b: number) {
    return { [PLAYERS.WHITE]: w, [PLAYERS.BLACK]: b };
}
