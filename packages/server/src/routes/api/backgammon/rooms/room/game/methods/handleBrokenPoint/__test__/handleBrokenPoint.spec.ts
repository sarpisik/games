import { Round, EmitBrokenPointRound } from '@shared-types/backgammon';
import handleBrokenPoint from '../handleBrokenPoint';

describe('handleBrokenPoint', () => {
    let backgammonGame: {
            rounds: Array<
                Pick<Round, 'id'> & {
                    calculateBrokenPoint: jasmine.Spy<jasmine.Func>;
                }
            >;
            _handleRoundResult: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
        },
        data: Omit<EmitBrokenPointRound, 'gameId'>;

    beforeEach(() => {
        const roundId = Date.now();
        backgammonGame = {
            rounds: [
                { id: roundId, calculateBrokenPoint: jasmine.createSpy() },
            ],
            _handleRoundResult: jasmine.createSpy(),
            _emitNamespace: jasmine.createSpy(),
        };
        data = {
            roundId,
            toTriangleIndex: 1,
            color: 'WHITE',
        };
    });

    it('should calculate brokens and call round result handler method within latest round and result', (done) => {
        const round = backgammonGame.rounds[0];
        round.calculateBrokenPoint.and.resolveTo(round);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleBrokenPoint.call(backgammonGame, data).then(() => {
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledTimes(1);
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledWith(
                round,
                round
            );
            done();
        });
    });
});
