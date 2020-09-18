import { addZero } from '../../../../../utils';

export default function dateToHours(t: number) {
    const d = new Date(t),
        h = addZero(d.getHours()),
        m = addZero(d.getMinutes()),
        s = addZero(d.getSeconds());

    return `${h}:${m}:${s}`;
}
