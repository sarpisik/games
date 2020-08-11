import { PLAYERS, Round } from 'types/lib/backgammon';
import { calculateShouldCollect } from '../../../../../utils';
import { recursivelyCalculateAvailableTriangle } from './utils';

export default function calculateAvailableTriangleExist(round: Round) {
    const { player: roundPlayer, layout, dice: dices } = round;
    const isPlayerBlack = PLAYERS[roundPlayer] === 'BLACK';
    const triangles = isPlayerBlack ? [...layout].reverse() : layout;
    const shouldCollect = calculateShouldCollect(roundPlayer, layout);

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
