import rollDices from '../rollDices';

describe('rollDices', () => {
    it('should return duplicated dices when it is double.', (done) => {
        rollDices().then(function onDices(dices) {
            if (dices.length < 4) rollDices().then(onDices);
            else done();
        });
    });

    it('should return dices.', (done) => {
        rollDices().then(function onDices(dices) {
            if (dices.length > 2) rollDices().then(onDices);
            else done();
        });
    });
});
