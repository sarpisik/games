/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PLAYERS } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { layout } from '../../../constants';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import { Round } from '../../../round';
import handleSurrender from '../handleSurrender';

describe('handleSurrender', () => {
    let data: Parameters<typeof handleSurrender>[0],
        backgammonGame: Pick<
            BackgammonGame,
            '_status' | '_handleTimer' | 'rounds' | 'players'
        > & {
            _emitNamespace: jasmine.Spy<jasmine.Func>;
            _handleNextRound: jasmine.Spy<jasmine.Func>;
        };

    beforeEach(() => {
        data = { type: 'REQUEST', payload: { id: '12345' } };
        backgammonGame = {
            // @ts-ignore
            players: generatePlayersObj({ id: '54321' }, { id: '12345' }),
            rounds: [],
            _status: 'SURRENDER',
            _emitNamespace: jasmine.createSpy('_emitNamespace'),
            _handleNextRound: jasmine.createSpy('_handleNextRound'),
            _handleTimer: jasmine.createSpy('_handleTimer'),
        };
    });

    it('does nothing on invalid data type', () => {
        // @ts-ignore
        data.type = '';

        // @ts-ignore
        handleSurrender.call(backgammonGame, data);

        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(0);
        expect(backgammonGame._handleTimer).toHaveBeenCalledTimes(0);
        expect(backgammonGame._handleNextRound).toHaveBeenCalledTimes(0);
    });

    it(`emits "${GAME_EVENTS.SURRENDER}" event when client requested to surrender.`, () => {
        // @ts-ignore
        handleSurrender.call(backgammonGame, data);

        expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
            'SURRENDER',
            data
        );
        expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
    });

    it(`emits "${GAME_EVENTS.SURRENDER}" event and continue playing when client rejected to surrender.`, (done) => {
        data.type = 'REJECT';
        data.payload.id = '54321'; // ID of the rejected player.
        backgammonGame._handleTimer = async () => {
            expect(backgammonGame._status).toBe('INITIALIZED');

            expect(backgammonGame._emitNamespace).toHaveBeenCalledWith(
                'SURRENDER',
                data
            );

            expect(backgammonGame._emitNamespace).toHaveBeenCalledTimes(1);
            done();
        };

        // @ts-ignore
        handleSurrender.call(backgammonGame, data);
    });

    it(`sets winner and calls "_handleNextRound" method on surrender accepted.`, () => {
        const acceptedPlayer = PLAYERS.BLACK,
            round = new Round(
                1,
                1,
                acceptedPlayer,
                generatePlayersObj(0, 0),
                generatePlayersObj(0, 0),
                layout
            );

        data.type = 'ACCEPT';
        data.payload.id = backgammonGame.players[acceptedPlayer]?.id as string;
        backgammonGame.rounds.push(round);

        // @ts-ignore
        handleSurrender.call(backgammonGame, data);

        expect(round.collected[acceptedPlayer]).toBe(15);
        expect(backgammonGame._handleNextRound).toHaveBeenCalledWith(round);
        expect(backgammonGame._handleNextRound).toHaveBeenCalledTimes(1);
    });
});
