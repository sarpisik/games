/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SCORES } from '../../../constants';
import updatePlayerScore from '../updatePlayerScore';
import { GameInput } from '@shared-backgammon/src/API';

type UpdatePlayerScore = Parameters<typeof updatePlayerScore>;

describe('updatePlayerScore', () => {
    let backgammonGame: {
            _userApi: {
                fetchUser: jasmine.Spy<jasmine.Func>;
                updateUser: jasmine.Spy<jasmine.Func>;
            };
        },
        action: UpdatePlayerScore[0],
        playerId: UpdatePlayerScore[1],
        _score: UpdatePlayerScore[2],
        response: { data: { getUser: { id: string; backgammon: GameInput } } };

    beforeEach(() => {
        backgammonGame = {
            _userApi: {
                fetchUser: jasmine.createSpy(),
                updateUser: jasmine.createSpy(),
            },
        };
        action = 'WIN';
        playerId = '1';
        _score = SCORES.WINNER;
        response = {
            data: {
                getUser: {
                    id: '1234',
                    backgammon: {
                        score: 800,
                        wins: 10,
                        loses: 10,
                        escapes: 10,
                    },
                },
            },
        };
    });

    it('throws error when user not found', (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue({ data: null });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, action, playerId, _score)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(0);
                done();
            });
    });

    it('throws error when invalid "action" parameter passed', (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue(response);

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, '', playerId, _score)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(0);
                done();
            });
    });

    it(`calculates for "${
        SCORES[SCORES.WINNER]
    }" and updates the user in db`, (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue(response);
        const backgammon = Object.assign({}, response.data.getUser.backgammon, {
            score: 815,
            wins: 11,
        });
        const result = Object.assign({}, response.data.getUser, { backgammon });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, action, playerId, _score)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(1);
                expect(backgammonGame._userApi.updateUser).toHaveBeenCalledWith(
                    result
                );
                done();
            });
    });

    it(`calculates for "${
        SCORES[SCORES.LOSER]
    }" and updates the user in db`, (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue(response);
        const backgammon = Object.assign({}, response.data.getUser.backgammon, {
            score: 790,
            loses: 11,
        });
        const result = Object.assign({}, response.data.getUser, { backgammon });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, 'LOSE', playerId, SCORES.LOSER)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(1);
                expect(backgammonGame._userApi.updateUser).toHaveBeenCalledWith(
                    result
                );
                done();
            });
    });

    it(`calculates for "${
        SCORES[SCORES.ESCAPE]
    }" and updates the user in db`, (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue(response);
        const backgammon = Object.assign({}, response.data.getUser.backgammon, {
            score: 775,
            escapes: 11,
        });
        const result = Object.assign({}, response.data.getUser, { backgammon });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, 'ESCAPE', playerId, SCORES.ESCAPE)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(1);
                expect(backgammonGame._userApi.updateUser).toHaveBeenCalledWith(
                    result
                );
                done();
            });
    });
});
