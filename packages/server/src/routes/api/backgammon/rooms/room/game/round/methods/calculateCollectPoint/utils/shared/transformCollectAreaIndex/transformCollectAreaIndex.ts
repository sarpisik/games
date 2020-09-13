import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

const INDEX_MAP = {
    [PLAYERS.BLACK]: (fromTriangleIndex: number) => fromTriangleIndex,
    [PLAYERS.WHITE]: (fromTriangleIndex: number) => 23 - fromTriangleIndex,
};

export default function transformCollectAreaIndex(
    player: Round['player'],
    fromTriangleIndex: number
) {
    return customPromise(() => INDEX_MAP[player](fromTriangleIndex));
}
