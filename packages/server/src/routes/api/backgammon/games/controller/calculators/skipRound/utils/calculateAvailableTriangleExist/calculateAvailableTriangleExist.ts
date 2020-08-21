import { PLAYERS, Round } from '@shared-types/backgammon';
import { recursivelyCalculateAvailableTriangle } from './utils';
import { calculateShouldCollect } from '../../../utils';
import { customPromise } from '@shared/customPromise';

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
