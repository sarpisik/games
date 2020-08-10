import { calculateShouldCollect } from 'src/routes/api/backgammon/games/controller/socket/utils';
import { PLAYERS, Round } from 'types/lib/backgammon';
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
