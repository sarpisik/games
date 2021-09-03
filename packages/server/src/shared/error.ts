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

export class InvalidDiceError extends BadRequestError {
    payload: EmitError;

    constructor(usedDice: number, possibleDices: number[]) {
        const usedDiceMsg = `Invalid dice: ${usedDice}`;
        const possibleDicesMsg = `Possibe dices: ${possibleDices.join(', ')}`;
        const message = usedDiceMsg + '\n' + possibleDicesMsg;

        super();

        this.payload = { message, type: EVENTS.INVALID_DICE };
    }
}

export class InvalidTriangleError extends BadRequestError {
    payload: EmitError;

    constructor(targetTriangle: number, possibleTriangles: number[]) {
        const targetTriangleMsg = `Invalid triangle: ${targetTriangle}`;
        const possibleTrianglesMsg = `Possibe triangles: ${possibleTriangles.join(
            ', '
        )}`;
        const message = targetTriangleMsg + '\n' + possibleTrianglesMsg;

        super();

        this.payload = { message, type: EVENTS.INVALID_TRIANGLE };
    }
}
