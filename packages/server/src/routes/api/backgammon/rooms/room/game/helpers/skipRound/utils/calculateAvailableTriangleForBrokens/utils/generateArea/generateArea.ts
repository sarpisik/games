import { Round, PLAYERS } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

const PLAYER_MAPS = {
    [PLAYERS.BLACK]: (layout: Round['layout']) => layout.slice(-6).reverse(),
    [PLAYERS.WHITE]: (layout: Round['layout']) => layout.slice(0, 6),
};

export default function generateArea(
    player: Round['player'],
    layout: Round['layout']
) {
    const handleArea = PLAYER_MAPS[player];

    return customPromise(() => handleArea(layout));
}
