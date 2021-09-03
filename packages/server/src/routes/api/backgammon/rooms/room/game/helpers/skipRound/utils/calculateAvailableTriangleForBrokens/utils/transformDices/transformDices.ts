import { Round } from '@shared-types/backgammon';
import { customPromise } from '@shared/customPromise';

export default function transformDices(dices: Round['dice']) {
    return customPromise(() => (dices.length > 2 ? dices.slice(0, 2) : dices));
}
