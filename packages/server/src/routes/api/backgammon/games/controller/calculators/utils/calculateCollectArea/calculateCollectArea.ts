import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

const START_MAP = {
    [PLAYERS.BLACK]: 6,
    [PLAYERS.WHITE]: 0,
};
const END_MAP = {
    [PLAYERS.BLACK]: (length: number) => length,
    [PLAYERS.WHITE]: (length: number) => length - 6,
};

export default async function calculateCollectArea(
    player: PLAYERS.WHITE | PLAYERS.BLACK,
    layout: Round['layout']
) {
    const start = START_MAP[player];
    const end = END_MAP[player](layout.length);

    return customPromise(() => layout.slice(start, end));
}
