import calculateIsStack from '../calculateIsStack';

describe('calculateIsStack', () => {
    it('should return true when all possible dices are pickable', (done) => {
        const startIndex = 4;
        const possibleDices = [5, 6];

        calculateIsStack(startIndex, possibleDices).then((stack) => {
            expect(stack).toBeTrue();
            done();
        });
    });

    it('should return true when atleast one of the possible dices is pickable', (done) => {
        const startIndex = 4;
        const possibleDices = [3, 5];

        calculateIsStack(startIndex, possibleDices).then((stack) => {
            expect(stack).toBeTrue();
            done();
        });
    });

    it('should return false when all possible dices are not pickable', (done) => {
        const startIndex = 4;
        const possibleDices = [3, 4];

        calculateIsStack(startIndex, possibleDices).then((stack) => {
            expect(stack).toBeFalse();
            done();
        });
    });

    it('should return false when there is no possible dice', (done) => {
        const startIndex = 4;
        const possibleDices: number[] = [];

        calculateIsStack(startIndex, possibleDices).then((stack) => {
            expect(stack).toBeFalse();
            done();
        });
    });
});
