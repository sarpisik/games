import transformDices from '../transformDices';
import { generateDoubledDice } from 'spec/support/generateDoubleDice';

describe('transformDices', () => {
    it('should return received dices when dices are not doubled', (done) => {
        const dices = [2, 5];

        transformDices(dices).then((result) => {
            expect(result).toEqual(dices);
            done();
        });
    });

    it('should return slice of received dices when dices are doubled', (done) => {
        const dices = generateDoubledDice(3);
        const transformed = dices.slice(0, 2);

        transformDices(dices).then((result) => {
            expect(result).toEqual(transformed);
            done();
        });
    });
});
