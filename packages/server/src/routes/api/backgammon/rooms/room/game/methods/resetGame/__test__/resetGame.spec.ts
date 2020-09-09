/* eslint-disable @typescript-eslint/ban-ts-comment */
import BackgammonGame from '../../../game';
import { generatePlayersObj, reduceGameProps } from '../../../helpers';
import resetGame from '../resetGame';
import { Round } from '../../../round';
import { GAME_EVENTS } from '@shared-types/game';

describe('resetGame', () => {
    let backgammonGame: Pick<
        BackgammonGame,
        'id' | 'duration' | 'timer' | 'stages' | 'score' | 'rounds'
    > & {
        players: {
            [key in Round['player']]: { id: number } | null;
        };
        _emitNamespace: jasmine.Spy<jasmine.Func>;
    };

    beforeEach(() => {
        const duration = 120;

        backgammonGame = {
            id: 1,
            _emitNamespace: jasmine.createSpy(),

            duration,
            players: generatePlayersObj(
                { id: Date.now() },
                { id: Date.now() + 1 }
            ),
            timer: generatePlayersObj(duration, duration),
            stages: 5,
            score: generatePlayersObj(3, 5),
            rounds: [],
        };
    });

    it('reset game', () => {
        // @ts-ignore
        resetGame.call(backgammonGame);

        expect(backgammonGame.duration).toBe(120);
        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame.timer).toEqual(generatePlayersObj(120, 120));
        expect(backgammonGame.stages).toBe(5);
        expect(backgammonGame.score).toEqual(generatePlayersObj(0, 0));
        expect(backgammonGame.rounds).toEqual([]);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME,
            // @ts-ignore
            reduceGameProps(backgammonGame)
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });

    it('reset game with default values', () => {
        delete backgammonGame.duration;
        delete backgammonGame.stages;

        // @ts-ignore
        resetGame.call(backgammonGame);

        expect(backgammonGame.duration).toBe(60);
        expect(backgammonGame.players).toEqual(generatePlayersObj(null, null));
        expect(backgammonGame.timer).toEqual(generatePlayersObj(60, 60));
        expect(backgammonGame.stages).toBe(1);
        expect(backgammonGame.score).toEqual(generatePlayersObj(0, 0));
        expect(backgammonGame.rounds).toEqual([]);
        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            GAME_EVENTS.JOIN_GAME,
            // @ts-ignore
            reduceGameProps(backgammonGame)
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });
});
