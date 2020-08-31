import { customPromise } from '@shared/customPromise';

export default function strToNmr(s: string) {
    return customPromise(() => parseInt(s));
}
