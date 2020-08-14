import { Round } from '@shared-types/backgammon';

export default function undoRoundCalculator(rounds: Round[]) {
    return new Promise<typeof rounds>((resolve, reject) => {
        setImmediate(() => {
            try {
                const length = rounds.length;

                const shouldUndo =
                    length > 0 &&
                    rounds[length - 1]?.player === rounds[length - 2]?.player;

                shouldUndo && rounds.pop();

                resolve(rounds);
            } catch (error) {
                reject(error);
            }
        });
    });
}
