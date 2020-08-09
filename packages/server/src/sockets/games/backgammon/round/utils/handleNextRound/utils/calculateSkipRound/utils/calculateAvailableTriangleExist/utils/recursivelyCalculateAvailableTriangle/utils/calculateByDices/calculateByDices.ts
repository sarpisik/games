import { recursivelyCalculateByDices } from './utils';

type CalculateByDicesParams = Omit<
    Parameters<typeof recursivelyCalculateByDices>[0],
    'resolve' | 'i'
>;

export default function calculateByDices(params: CalculateByDicesParams) {
    const {
        dices,
        fromTriangleIndex,
        roundPlayer,
        shouldCollect,
        triangles,
    } = params;

    return new Promise<boolean>((resolve, reject) => {
        recursivelyCalculateByDices({
            dices,
            fromTriangleIndex,
            roundPlayer,
            shouldCollect,
            triangles,
            resolve,
        }).catch(reject);
    });
}
