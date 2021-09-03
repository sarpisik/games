export default function duplicateDice(dice: number, limit: number) {
    let dices: number[] = [];

    for (let i = 1; i <= limit; i++) {
        dices.push(dice * i);
    }

    return dices;
}
