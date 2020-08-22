export const duplicateDice = (dice: number) => Array(4).fill(dice);

export const generateDoubledDice = (dice: number) =>
    duplicateDice(dice).map((dice, i) => dice * (i + 1));
