import { EmitRound } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { Round } from '../../../round';
import handleRoundCalculate from '../handleRoundCalculate';
import { InvalidTriangleError } from '@shared/error';
import { NOTIFY_DURATION } from '@shared-types/constants';

describe('handleRoundCalculate', () => {
    let backgammonGame: {
            rounds: Array<
                Pick<Round, 'id'> & { calculate: jasmine.Spy<jasmine.Func> }
            >;
            _handleRoundResult: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
        },
        data: Omit<EmitRound, 'gameId'>;

    beforeEach(() => {
        const roundId = Date.now();
        backgammonGame = {
            rounds: [{ id: roundId, calculate: jasmine.createSpy() }],
            _handleRoundResult: jasmine.createSpy(),
            _emitNamespace: jasmine.createSpy(),
        };
        data = {
            roundId,
            fromTriangleIndex: 0,
            toTriangleIndex: -1,
            color: 'WHITE',
        };
    });

    it('catch and emit error when round not found.', (done) => {
        backgammonGame.rounds = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleRoundCalculate.call(backgammonGame, data).then(() => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.BAD_REQUEST,
                `Round not found by id: ${data.roundId}`
            );
            done();
        });
    });

    it('catch and emit error when target triangle is invalid.', (done) => {
        const invalidTriangleError = new InvalidTriangleError(
            data.toTriangleIndex,
            [1, 3, 5]
        );
        const round = backgammonGame.rounds[0];
        round.calculate.and.throwError(invalidTriangleError);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleRoundCalculate.call(backgammonGame, data).then(() => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.ERROR,
                invalidTriangleError.payload
            );

            setTimeout(() => {
                expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(2);
                expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                    GAME_EVENTS.ROUND,
                    round
                );
                done();
            }, NOTIFY_DURATION * 1.1);
        });
    });

    it('should call result handler method within latest round and new round.', (done) => {
        const round = backgammonGame.rounds[0];
        round.calculate.and.resolveTo(round);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleRoundCalculate.call(backgammonGame, data).then(() => {
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledTimes(1);
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledWith(
                round,
                round
            );
            done();
        });
    });
});
