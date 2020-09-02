/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import recursivelySetTimer from '../recursivelySetTimer';

describe('recursivelySetTimer', () => {
    let backgammonGame: Pick<BackgammonGame, '_t' | '_tRef' | 'timer'> & {
            _handleGameOver: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _recursivelySetTimer: (
                latestRoundPlayer: PLAYERS | undefined
            ) => Promise<void>;
        },
        latestRoundPlayer: PLAYERS | undefined;

    beforeEach(() => {
        const player = PLAYERS.BLACK;
        backgammonGame = {
            _t: player,
            timer: generatePlayersObj(60, 60),
            _emitNamespace: jasmine.createSpy(),
            _handleGameOver: jasmine.createSpy(),
            _recursivelySetTimer: jasmine.createSpy(),
        };
        latestRoundPlayer = player;
    });

    it('does nothing.', (done) => {
        delete backgammonGame._t;

        // @ts-ignore
        recursivelySetTimer.call(backgammonGame, latestRoundPlayer).then(() => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
            expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(0);
            expect(backgammonGame._recursivelySetTimer).toHaveBeenCalledTimes(
                0
            );
            done();
        });
    });

    it('calls itself recursively.', (done) => {
        backgammonGame._recursivelySetTimer = async (_latestRoundPlayer) => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.TIMER,
                generatePlayersObj(59, 60)
            );
            expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(0);
            expect(_latestRoundPlayer).toBe(latestRoundPlayer);
            done();
        };

        // @ts-ignore
        recursivelySetTimer.call(backgammonGame, latestRoundPlayer);
    });

    it('calls game over handler.', (done) => {
        backgammonGame.timer = generatePlayersObj(1, 60);

        // @ts-ignore
        recursivelySetTimer.call(backgammonGame, latestRoundPlayer).then(() => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
            expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(1);
            expect(backgammonGame._handleGameOver).toHaveBeenCalledWith({
                winner: PLAYERS.WHITE,
            });
            expect(backgammonGame._recursivelySetTimer).toHaveBeenCalledTimes(
                0
            );
            done();
        });
    });
});
