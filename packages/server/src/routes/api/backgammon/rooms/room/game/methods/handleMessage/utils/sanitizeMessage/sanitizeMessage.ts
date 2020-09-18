import validator from 'validator';

export default function sanitizeMessage(message: string): string {
    return validator.escape(validator.trim(message));
}
