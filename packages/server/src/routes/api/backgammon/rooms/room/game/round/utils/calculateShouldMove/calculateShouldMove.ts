import { Round } from '@shared-types/backgammon';
import { customPromiseSome } from '@shared/customPromise';

export default function calculateShouldMove(
    player: Round['player'],
    collectArea: Round['layout']
) {
    const calculateOwner = handleCalculateOwner(player);

    return customPromiseSome(collectArea, calculateOwner);
}

function handleCalculateOwner(player: Round['player']) {
    return function calculateOwner(triangle: Round['layout'][number]) {
        const [owner] = triangle;
        return owner === player;
    };
}
