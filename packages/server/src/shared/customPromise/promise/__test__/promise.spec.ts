import { customPromise } from '..';

describe('customPromise', () => {
    it('should catch error and call reject', (done) => {
        const errMsg = 'test error';
        const cb = () => {
            throw new Error(errMsg);
        };

        customPromise(cb).catch((error) => {
            expect(error.message).toEqual(errMsg);
            done();
        });
    });

    it('should resolve successfully.', (done) => {
        const resolved = 'test error';
        const cb = () => resolved;

        customPromise(cb).then((result) => {
            expect(result).toEqual(resolved);
            done();
        });
    });
});
