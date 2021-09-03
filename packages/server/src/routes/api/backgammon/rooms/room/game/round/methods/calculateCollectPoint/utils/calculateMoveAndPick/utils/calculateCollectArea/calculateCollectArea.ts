import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromiseSlice, customPromise } from '@shared/customPromise';

const AREA_MAP = {
    [PLAYERS.BLACK]: generateArea(0, 6),
    [PLAYERS.WHITE]: generateArea(18, 24),
};

export default async function calculateCollectArea(
    player: Round['player'],
    layout: Round['layout']
) {
    const indexes = AREA_MAP[player];
    const { start, end } = indexes;

    const area = await customPromiseSlice(layout, start, end);

    if (player === PLAYERS.WHITE) return customPromise(() => area.reverse());

    return area;
}

function generateArea(start: number, end: number) {
    return { start, end };
}
