import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
import { EmitError, EVENTS } from '@shared-types/backgammon';
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

export class NotFoundError extends CustomError {
    constructor(message = paramMissingError) {
        super(NOT_FOUND, message);
    }
}

export class GameNotFoundError extends NotFoundError {
    payload: EmitError;

    constructor(message: string) {
        super(message);
        this.payload = { message, type: EVENTS.GAME_NOT_FOUND };
    }
}
