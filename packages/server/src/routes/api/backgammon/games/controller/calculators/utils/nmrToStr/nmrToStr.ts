import { customPromise } from '@shared/customPromise';

export default function strToNmr(n: number) {
    return customPromise(() => n.toString());
}
