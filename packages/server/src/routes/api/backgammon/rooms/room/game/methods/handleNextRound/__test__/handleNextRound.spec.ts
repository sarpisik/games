/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    EmitScore,
    EmitStageOver,
    OPPONENT,
    PLAYERS,
} from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { layout } from '../../../constants';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import { Round } from '../../../round';
import handleNextRound from '../handleNextRound';

describe('handleNextRound', () => {
    let backgammonGame: Pick<BackgammonGame, 'score' | 'stages'> & {
            _handleGameOver: jasmine.Spy<jasmine.Func>;
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _handleNextRound: (round: Round) => Promise<void>;
            _initializeGame: (
                roundPlayer: PLAYERS.WHITE | PLAYERS.BLACK
            ) => void;

            _emitNextRound: jasmine.Spy<jasmine.Func>;
        },
        round: Pick<
            Round,
            'brokens' | 'collected' | 'dice' | 'layout' | 'player' | 'turn'
        >;

    beforeEach(() => {
        backgammonGame = {
            score: generatePlayersObj(0, 0),
            stages: 3,
            _emitNamespace: jasmine.createSpy(),
            _emitNextRound: jasmine.createSpy(),
            _handleGameOver: jasmine.createSpy(),
            _handleNextRound: jasmine.createSpy(),
            _initializeGame: jasmine.createSpy(),
        };
        round = {
            brokens: generatePlayersObj(0, 0),
            collected: generatePlayersObj(0, 0),
            dice: [5],
            layout,
            player: PLAYERS.WHITE,
            turn: 1,
        };
    });

    it('should call next round emitter method when stage is not over', (done) => {
        // @ts-ignore
        handleNextRound.call(backgammonGame, round).then(() => {
            expect(backgammonGame._emitNextRound).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNextRound).toHaveBeenCalledWith(round);
            done();
        });
    });

    it('should call next round handler method when should skip round', (done) => {
        // Increase round player's brokens
        round.brokens[PLAYERS.WHITE] += 2;
        // Block all available triangles so that it will have to skip round.
        round.layout = round.layout.map((t, i) => {
            const blackPlayerArea = i < 6;
            if (blackPlayerArea) return [PLAYERS.BLACK, 2];
            return t;
        });

        backgammonGame._handleNextRound = async (_round) => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.SKIP_ROUND,
                {
                    round,
                    message: 'You can not move. Skipping to next round.',
                }
            );
            expect(_round.player).toBe(PLAYERS.BLACK);
            expect(_round.brokens).toEqual(round.brokens);
            expect(_round.collected).toEqual(round.collected);
            expect(_round.layout).toEqual(round.layout);
            done();
        };

        // @ts-ignore
        handleNextRound.call(backgammonGame, round);
    });

    it('should initialize new round when stage is over and mars', (done) => {
        const roundPlayer = round.player;
        // Increase round player's collected
        round.collected[roundPlayer] = 15;

        const payload: EmitScore = {
            winner: roundPlayer,
            score: generatePlayersObj(0, 2), //Mars
            stages: backgammonGame.stages,
        };

        backgammonGame._initializeGame = async (winner) => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.STAGE_OVER,
                payload
            );
            expect(winner).toBe(roundPlayer);
            done();
        };

        // @ts-ignore
        handleNextRound.call(backgammonGame, round);
    });

    it('should initialize new round when stage is over', (done) => {
        const roundPlayer = round.player;
        // Increase round player's collected
        round.collected[roundPlayer] = 15;
        round.collected[OPPONENT[roundPlayer]] = 10;

        const payload: EmitScore = {
            winner: roundPlayer,
            score: generatePlayersObj(0, 1),
            stages: backgammonGame.stages,
        };

        backgammonGame._initializeGame = async (winner) => {
            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                GAME_EVENTS.STAGE_OVER,
                payload
            );
            expect(winner).toBe(roundPlayer);
            done();
        };

        // @ts-ignore
        handleNextRound.call(backgammonGame, round);
    });

    it('should call game over handler method', (done) => {
        const roundPlayer = round.player;
        // Increase round player's collected
        round.collected[roundPlayer] = 15;
        // Update score
        backgammonGame.score[roundPlayer] = backgammonGame.stages - 2;

        const payload: EmitStageOver = {
            winner: roundPlayer,
        };

        // @ts-ignore
        handleNextRound.call(backgammonGame, round).then(() => {
            expect(backgammonGame._handleGameOver).toHaveBeenCalledTimes(1);
            expect(backgammonGame._handleGameOver).toHaveBeenCalledWith(
                payload
            );
            done();
        });
    });
});
