import { BAD_REQUEST } from 'http-status-codes';
import { paramMissingError } from './constants';

export class CustomError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }
}

export class BadRequestError extends CustomError {
    constructor(message = paramMissingError) {
        super(BAD_REQUEST, message);
    }
}
