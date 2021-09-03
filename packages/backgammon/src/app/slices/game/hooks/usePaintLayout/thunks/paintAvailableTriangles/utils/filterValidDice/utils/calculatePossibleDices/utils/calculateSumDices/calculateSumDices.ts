export default function calculateSumDices(dices: number[]) {
    return dices.reduce(sumDices);
}

function sumDices(sum: number, dice: number) {
    return sum + dice;
}
