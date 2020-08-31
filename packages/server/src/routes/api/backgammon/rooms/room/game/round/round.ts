import { rollDice } from './utils';
import { Round as R } from '@shared-types/backgammon';

export default class Round implements R {
    id: R['id'];
    dice: R['dice'];

    constructor(
        public attempt: R['attempt'],
        public turn: R['turn'],
        public player: R['player'],
        public brokens: R['brokens'],
        public collected: R['collected'],
        public layout: R['layout']
    ) {
        this.id = Date.now();
        this.dice = this.rollDices();
    }

    rollDices() {
        const dices = [rollDice(), rollDice()];
        const shouldDuplicate = dices[0] === dices[1];

        return shouldDuplicate ? dices.concat(dices) : dices;
    }
}
