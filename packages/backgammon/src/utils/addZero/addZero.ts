export default function addZero(t: number) {
    return t < 10 ? '0' + t : t.toString();
}
