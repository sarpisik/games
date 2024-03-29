import { app } from '@server';
import { OK, BAD_REQUEST, CREATED } from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';
import { pErr } from '@shared/functions';
import { GamesService } from '@routes/api/backgammon/games';
import { Game, PLAYERS } from '@shared-types/backgammon';

describe('backgammon/games api', () => {
    const gamesPath = '/api/backgammon/games';
    const getGamePath = '/api/backgammon/games/:id';
    const putGamePath = '/api/backgammon/games/:id';

    const games: Game[] = [
        {
            id: Date.now(),
            players: {
                [PLAYERS.BLACK]: Date.now(),
                [PLAYERS.WHITE]: Date.now(),
            },
            score: { [PLAYERS.BLACK]: 0, [PLAYERS.WHITE]: 0 },
            stages: 1,
            rounds: [],
        },
        {
            id: Date.now(),
            players: {
                [PLAYERS.BLACK]: Date.now(),
                [PLAYERS.WHITE]: Date.now(),
            },
            score: { [PLAYERS.BLACK]: 0, [PLAYERS.WHITE]: 0 },
            stages: 1,
            rounds: [],
        },
        {
            id: Date.now(),
            players: {
                [PLAYERS.BLACK]: Date.now(),
                [PLAYERS.WHITE]: Date.now(),
            },
            score: { [PLAYERS.BLACK]: 0, [PLAYERS.WHITE]: 0 },
            stages: 1,
            rounds: [],
        },
    ];

    let agent: SuperTest<Test>;

    type Callback = supertest.CallbackHandler | undefined;

    // Use "done" callback to prevent error:
    // https://github.com/nodejs/node/issues/27261
    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${gamesPath}"`, () => {
        const callApi = (callback: Callback) =>
            agent.get(gamesPath).end(callback);

        it(`should return a JSON object with all the games and a status code of "${OK}" if the request was successful.`, (done) => {
            spyOn(GamesService.prototype, 'readGames').and.returnValue(
                Promise.resolve(games)
            );

            callApi((err, res) => {
                pErr(err);
                expect(res.status).toBe(OK);
                expect(res.body).toEqual(games);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });

        it(`should return a JSON object containing an error message and a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Something went wrong.';
            spyOn(GamesService.prototype, 'readGames').and.throwError(errMsg);

            callApi((err, res) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });

    describe(`"POST:${gamesPath}"`, () => {
        type ReqBody = Parameters<GamesService['createGame']>[0];

        const gameData: ReqBody = {
            players: {
                [PLAYERS.WHITE]: Date.now(),
                [PLAYERS.BLACK]: -1,
            },
            stages: 1,
        };

        const callApi = (reqBody: ReqBody, callback: Callback) =>
            agent.post(gamesPath).type('form').send(reqBody).end(callback);

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            const game = games[0];

            spyOn(GamesService.prototype, 'createGame').and.returnValue(
                Promise.resolve(game)
            );

            callApi(gameData, (err, res) => {
                pErr(err);
                expect(res.status).toBe(CREATED);
                expect(res.body).toEqual(game);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });

        it(`should return a JSON object containing an error message and a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Something went wrong.';
            spyOn(GamesService.prototype, 'createGame').and.throwError(errMsg);

            callApi(gameData, (err, res) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });

    describe(`"GET:${getGamePath}"`, () => {
        const url = getGamePath.replace(':id', '12345');
        const callApi = (callback: Callback) => agent.get(url).end(callback);

        it(`should return a JSON object with the game and a status code of "${OK}" if the request was successful.`, (done) => {
            const game = games[1];

            spyOn(GamesService.prototype, 'readGame').and.returnValue(
                Promise.resolve(game)
            );

            callApi((err, res) => {
                pErr(err);
                expect(res.status).toBe(OK);
                expect(res.body).toEqual(game);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });

        it(`should return a JSON object containing an error message and a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Something went wrong.';
            spyOn(GamesService.prototype, 'readGame').and.throwError(errMsg);

            callApi((err, res) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });

    describe(`"PUT:${putGamePath}"`, () => {
        type ReqBody = Pick<Game, 'players'>;

        let game = games[2];
        const url = getGamePath.replace(':id', game.id.toString());

        const gameData: ReqBody = {
            players: {
                [PLAYERS.BLACK]: Date.now(),
                [PLAYERS.WHITE]: Date.now(),
            },
        };

        const callApi = (reqBody: ReqBody, callback: Callback) =>
            agent.put(url).type('form').send(reqBody).end(callback);

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            spyOn(GamesService.prototype, 'readGame').and.returnValue(
                Promise.resolve(game)
            );

            game = Object.assign({}, game, gameData);

            spyOn(GamesService.prototype, 'updateGame').and.returnValue(
                Promise.resolve(game)
            );

            callApi(gameData, (err, res) => {
                pErr(err);
                expect(res.status).toBe(OK);
                expect(res.body).toEqual(game);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });

        it(`should return a JSON object containing an error message and a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Something went wrong.';
            spyOn(GamesService.prototype, 'readGame').and.returnValue(
                Promise.resolve(game)
            );
            spyOn(GamesService.prototype, 'updateGame').and.throwError(errMsg);

            callApi(gameData, (err, res) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
});
