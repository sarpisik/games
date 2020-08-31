import { calculateShouldCollect } from '@routes/api/backgammon/games/controller/calculators/utils';
import { PLAYERS, Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';
import { recursivelyCalculateAvailableTriangle } from './utils';

export default async function calculateAvailableTriangleExist(round: Round) {
    const { player: roundPlayer, layout, dice: dices } = round;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const triangles = isPlayerBlack
        ? await customPromise(() => [...layout].reverse())
        : layout;
    const shouldCollect = await calculateShouldCollect(roundPlayer, layout);

    return new Promise<boolean>((resolve, reject) => {
        recursivelyCalculateAvailableTriangle({
            triangles,
            roundPlayer,
            shouldCollect,
            dices,
            resolve,
        }).catch(reject);
    });
}
