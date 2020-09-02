/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { PLAYERS } from '@shared-types/backgammon';
import { SHORT_TIMER } from '@shared-types/constants';
import recursivelySetShortTimer from '../recursivelySetShortTimer';
import { GAME_EVENTS } from '@shared-types/game';

describe('recursivelySetShortTimer', () => {
    let backgammonGame: Pick<BackgammonGame, '_t'> & {
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _recursivelySetTimer: jasmine.Spy<jasmine.Func>;
            _recursivelySetShortTimer: (
                latestRoundPlayer: PLAYERS | undefined,
                seconds?: number
            ) => Promise<void>;
        },
        latestRoundPlayer: PLAYERS | undefined,
        seconds: number;

    beforeEach(() => {
        const player = PLAYERS.WHITE;
        backgammonGame = {
            _t: player,
            _emitNamespace: jasmine.createSpy(),
            _recursivelySetTimer: jasmine.createSpy(),
            _recursivelySetShortTimer: jasmine.createSpy(),
        };
        latestRoundPlayer = player;
        seconds = SHORT_TIMER;
    });

    it('does nothing.', (done) => {
        delete backgammonGame._t;

        // @ts-ignore
        recursivelySetShortTimer.call(backgammonGame, latestRoundPlayer);

        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
        expect(backgammonGame._recursivelySetShortTimer).toHaveBeenCalledTimes(
            0
        );
        expect(backgammonGame._recursivelySetTimer).toHaveBeenCalledTimes(0);
        done();
    });

    it('calls itself recursively.', (done) => {
        const resultSecons = seconds - 1;
        backgammonGame._recursivelySetShortTimer = async (
            _latestRoundPlayer,
            _seconds
        ) => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.SHORT_TIMER,
                resultSecons
            );

            expect(backgammonGame._recursivelySetTimer).toHaveBeenCalledTimes(
                0
            );

            expect(_latestRoundPlayer).toBe(latestRoundPlayer);
            expect(_seconds).toBe(resultSecons);

            done();
        };

        recursivelySetShortTimer.call(
            // @ts-ignore
            backgammonGame,
            latestRoundPlayer,
            seconds
        );
    });

    it('calls long timer.', (done) => {
        seconds = 1;
        const resultSecons = seconds - 1;

        recursivelySetShortTimer
            .call(
                // @ts-ignore
                backgammonGame,
                latestRoundPlayer,
                seconds
            )
            .then(() => {
                expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
                expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                    GAME_EVENTS.SHORT_TIMER,
                    resultSecons
                );

                expect(
                    backgammonGame._recursivelySetTimer
                ).toHaveBeenCalledTimes(1);
                expect(
                    backgammonGame._recursivelySetTimer
                ).toHaveBeenCalledWith(latestRoundPlayer);

                expect(
                    backgammonGame._recursivelySetShortTimer
                ).toHaveBeenCalledTimes(0);

                done();
            });
    });
});
