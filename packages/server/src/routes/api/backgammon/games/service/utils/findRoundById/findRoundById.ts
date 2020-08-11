import { Round } from 'types/lib/backgammon';

export default function findRoundById(roundId: Round['id'], rounds: Round[]) {
    return new Promise<Round>((resolve, reject) => {
        recursivelyFindRoundById({ roundId, rounds, resolve }).catch(reject);
    });
}

interface Params {
    roundId: Round['id'];
    rounds: Round[];
    resolve: (value?: Round) => void;
    i?: number;
}

async function recursivelyFindRoundById(params: Params) {
    const { roundId, rounds, resolve, i = 0 } = params;

    if (i >= rounds.length) {
        throw new Error(`Round not found by id: ${roundId}`);
    } else {
        const round = rounds[i];
        const shouldResolve = round.id === roundId;

        if (shouldResolve) {
            resolve(round);
        } else {
            params.i = i + 1;

            setImmediate(() => {
                recursivelyFindRoundById(params);
            });
        }
    }
}
