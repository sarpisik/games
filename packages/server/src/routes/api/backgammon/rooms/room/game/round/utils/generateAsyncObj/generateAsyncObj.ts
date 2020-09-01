import { customPromise } from '@shared/customPromise';

export default function generateAsyncObj<B, D, L>(
    brokens: B,
    dice: D,
    layout: L
) {
    return customPromise(() => ({ brokens, dice, layout }));
}
