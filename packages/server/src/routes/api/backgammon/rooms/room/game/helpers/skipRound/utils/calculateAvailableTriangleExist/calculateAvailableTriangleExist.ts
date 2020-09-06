import { PLAYERS, Round } from '@shared-types/backgammon';
import { calculateShouldCollect } from '../../../../round/utils';
import {
    recursivelyCalculateAvailableTriangle,
    recursivelyCalculatePickableTriangle,
} from './utils';

export default async function calculateAvailableTriangleExist(round: Round) {
    const { player: roundPlayer, layout, dice: dices } = round;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const triangles = isPlayerBlack ? [...layout].reverse() : layout;
    const shouldCollect = await calculateShouldCollect(roundPlayer, layout);

    return new Promise<boolean>((resolve, reject) => {
        if (shouldCollect)
            return recursivelyCalculatePickableTriangle({
                triangles: isPlayerBlack
                    ? triangles.slice(0, 6)
                    : triangles.slice(18),
                roundPlayer,
                dices,
                resolve,
            }).catch(reject);
        return recursivelyCalculateAvailableTriangle({
            triangles,
            roundPlayer,
            dices,
            resolve,
        }).catch(reject);
    });
}
