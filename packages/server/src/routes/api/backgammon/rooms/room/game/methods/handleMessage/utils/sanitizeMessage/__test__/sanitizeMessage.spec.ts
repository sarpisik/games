import sanitizeMessage from '../sanitizeMessage';

describe('sanitizeMessage', () => {
    it('trims the message', () => {
        expect(sanitizeMessage('    hello    ')).toBe('hello');
    });
    it('escapes the message', () => {
        expect(sanitizeMessage('https://www.npmjs.com/package/validator')).toBe(
            'https:&#x2F;&#x2F;www.npmjs.com&#x2F;package&#x2F;validator'
        );
    });
});
