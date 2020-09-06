import { PLAYERS, Round } from '@shared-types/backgammon';
import { calculateShouldCollect } from '../../../../round/utils';
import {
    recursivelyCalculateAvailableTriangle,
    recursivelyCalculatePickableTriangle,
} from './utils';

export default async function calculateAvailableTriangleExist(round: Round) {
    const { player: roundPlayer, layout, dice: dices } = round;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const shouldCollect = await calculateShouldCollect(roundPlayer, layout);

    return new Promise<boolean>((resolve, reject) => {
        if (shouldCollect)
            return recursivelyCalculatePickableTriangle({
                triangles: isPlayerBlack
                    ? layout.slice(0, 6)
                    : layout.slice(18).reverse(),
                roundPlayer,
                dices,
                resolve,
            }).catch(reject);
        return recursivelyCalculateAvailableTriangle({
            triangles: isPlayerBlack ? [...layout].reverse() : layout,
            roundPlayer,
            dices,
            resolve,
        }).catch(reject);
    });
}
