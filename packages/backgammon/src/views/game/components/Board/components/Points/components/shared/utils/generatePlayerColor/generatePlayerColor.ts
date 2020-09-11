import { PLAYERS } from 'types/lib/backgammon';

export default function generatePlayerColor(
    target: any
): keyof Pick<typeof PLAYERS, 'BLACK' | 'WHITE'> {
    return target.attrs.image.dataset.color;
}
