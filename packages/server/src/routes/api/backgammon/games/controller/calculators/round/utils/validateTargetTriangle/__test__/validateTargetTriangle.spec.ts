import validateTargetTriangle from '../validateTargetTriangle';

describe('validateTargetTriangle', () => {
    it('should return true when list of valid triangles includes index of target triangle.', (done) => {
        const validTraingleIndexes = [2, 4, 6];
        const targetTriangleIndex = 4;

        validateTargetTriangle(validTraingleIndexes, targetTriangleIndex).then(
            (result) => {
                expect(result).toBeTrue();
                done();
            }
        );
    });

    it('should return false when list of valid triangles does not include index of target triangle.', (done) => {
        const validTraingleIndexes = [2, 6];
        const targetTriangleIndex = 4;

        validateTargetTriangle(validTraingleIndexes, targetTriangleIndex).then(
            (result) => {
                expect(result).toBeFalse();
                done();
            }
        );
    });
});
