/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SCORES } from '../../../constants';
import updatePlayerScore, { Params } from '../updatePlayerScore';
import { GameInput } from '@shared-backgammon/src/API';

describe('updatePlayerScore', () => {
    let backgammonGame: {
            _userApi: {
                fetchUser: jasmine.Spy<jasmine.Func>;
                updateUser: jasmine.Spy<jasmine.Func>;
            };
        },
        params: Params,
        response: { data: { getUser: { id: string; backgammon: GameInput } } };

    beforeEach(() => {
        backgammonGame = {
            _userApi: {
                fetchUser: jasmine.createSpy(),
                updateUser: jasmine.createSpy(),
            },
        };
        params = {
            action: 'WIN',
            playerId: '1',
            _score: SCORES.WINNER,
        };
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
            .call(backgammonGame, params)
            .then(() => {
                expect(
                    backgammonGame._userApi.updateUser
                ).toHaveBeenCalledTimes(0);
                done();
            });
    });

    it('throws error when invalid "action" parameter passed', (done) => {
        backgammonGame._userApi.fetchUser.and.returnValue(response);
        // @ts-ignore
        params.action = '';

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, params)
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
            .call(backgammonGame, params)
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
        params.action = 'LOSE';
        params._score = SCORES.LOSER;
        const backgammon = Object.assign({}, response.data.getUser.backgammon, {
            score: 790,
            loses: 11,
        });
        const result = Object.assign({}, response.data.getUser, { backgammon });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, params)
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
        params.action = 'ESCAPE';
        params._score = SCORES.ESCAPE;
        const backgammon = Object.assign({}, response.data.getUser.backgammon, {
            score: 775,
            escapes: 11,
        });
        const result = Object.assign({}, response.data.getUser, { backgammon });

        updatePlayerScore
            // @ts-ignore
            .call(backgammonGame, params)
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
