import { EmitCollectPointRound } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { Round } from '../../../round';
import handleCollectPoint from '../handleCollectPoint';

describe('handleCollectPoint', () => {
    let backgammonGame: {
            rounds: Array<
                Pick<Round, 'id'> & {
                    calculateCollectPoint: jasmine.Spy<jasmine.Func>;
                }
            >;
            _handleRoundResult: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
        },
        data: Omit<EmitCollectPointRound, 'gameId'>;

    beforeEach(() => {
        const roundId = Date.now();
        backgammonGame = {
            rounds: [
                { id: roundId, calculateCollectPoint: jasmine.createSpy() },
            ],
            _handleRoundResult: jasmine.createSpy(),
            _emitNamespace: jasmine.createSpy(),
        };
        data = {
            fromTriangleIndex: 0,
            roundId,
            color: 'WHITE',
        };
    });

    it('should send round back when points not collected', (done) => {
        const round = backgammonGame.rounds[0];
        round.calculateCollectPoint.and.resolveTo(null);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleCollectPoint.call(backgammonGame, data).then(() => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.COLLECT_POINT_ROUND,
                round
            );
            done();
        });
    });

    it('should call round result handler method within round when points collected', (done) => {
        const round = backgammonGame.rounds[0];
        round.calculateCollectPoint.and.resolveTo(round);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        handleCollectPoint.call(backgammonGame, data).then(() => {
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledTimes(1);
            expect(backgammonGame._handleRoundResult).toHaveBeenCalledWith(
                round,
                round
            );
            done();
        });
    });
});
