/* eslint-disable @typescript-eslint/ban-ts-comment */
import { User } from '@shared-backgammon/src/types/user';
import { EmitStageOver, PLAYERS } from '@shared-types/backgammon';
import { SCORES } from '../../../constants';
import BackgammonGame from '../../../game';
import { generatePlayersObj } from '../../../helpers';
import handlePlayersScore from '../handlePlayersScore';

describe('handlePlayersScore', () => {
    let winner: EmitStageOver['winner'],
        backgammonGame: Pick<
            BackgammonGame,
            'score' | 'stages' | '_updatePlayerScore'
        > & {
            players: {
                [PLAYERS.BLACK]: Pick<User, 'id'>;
                [PLAYERS.WHITE]: Pick<User, 'id'>;
            };
        };

    beforeEach(() => {
        winner = PLAYERS.WHITE;
        backgammonGame = {
            score: generatePlayersObj(3, 5),
            stages: 5,
            players: generatePlayersObj({ id: '1' }, { id: '2' }),
            _updatePlayerScore: jasmine.createSpy(),
        };
    });

    it(`calculates scores when no mars and the winner is "${
        PLAYERS[PLAYERS.WHITE]
    }" player.`, () => {
        const winnerId = backgammonGame.players[PLAYERS.WHITE].id;
        const winnerScore = SCORES.WINNER;

        const loserId = backgammonGame.players[PLAYERS.BLACK].id;
        const loserScore = SCORES.LOSER;
        // Ignore missing attirubtes of BackgammonGame
        // @ts-ignore
        handlePlayersScore.call(backgammonGame, { winner });

        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledTimes(2);
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith({
            action: 'WIN',
            playerId: winnerId,
            _score: winnerScore,
        });
        expect(backgammonGame._updatePlayerScore).toHaveBeenCalledWith({
            action: 'LOSE',
            playerId: loserId,
            _score: loserScore,
        });
    });
});
