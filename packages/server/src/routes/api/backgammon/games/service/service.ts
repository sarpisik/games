import { BadRequestError, GameNotFoundError } from '@shared/error';
import { CreateGame, Game, Round, PLAYERS } from '@shared-types/backgammon';
import { rollDices } from '../controller/calculators/utils';
import { findRoundById } from './utils';
import { customPromise, customPromiseMap } from '@shared/customPromise';

export default class GamesService {
    constructor(private _games: Map<number, Game>) {}

    async readGames() {
        const gamesMap = await customPromise(() => Array.from(this._games));

        return customPromiseMap(gamesMap, function parseGame(gameMap) {
            const [, game] = gameMap;
            return game;
        });
    }

    readGame(id: number) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                try {
                    if (games.has(id)) resolve(games.get(id));
                    else
                        throw new GameNotFoundError(
                            `Game not found by id: ${id}`
                        );
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async readRound(gameId: Game['id'], roundId: Round['id']) {
        const game = await this.readGame(gameId);
        return findRoundById(roundId, game.rounds);
    }

    async createGame(data: CreateGame) {
        const { players, stages } = data;

        const id = await customPromise(() => Date.now());
        const game = await customPromise<Game>(() => ({
            id,
            players,
            stages,
            rounds: [],
            score: { [PLAYERS.WHITE]: 0, [PLAYERS.BLACK]: 0 },
        }));

        await customPromise(() => {
            this._games.set(id, game);
        });

        return game;
    }

    async createRound(
        data: Pick<
            Game['rounds'][number],
            'player' | 'brokens' | 'collected' | 'layout'
        >
    ) {
        const { player, brokens, collected, layout } = data;
        const dice = await rollDices();
        const newRound: Game['rounds'][number] = {
            player,
            brokens,
            collected,
            layout,
            dice,
            attempt: 0,
            turn: 1,
            id: Date.now(),
        };

        return newRound;
    }

    updateGame(game: Game) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                try {
                    if (games.has(game.id)) {
                        resolve(games.set(game.id, game).get(game.id));
                    } else {
                        throw new BadRequestError(
                            `Game not found by id: ${game.id}`
                        );
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    updateRounds(gameId: Game['id'], round: Round) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                try {
                    const game = games.get(gameId);
                    if (game) {
                        game.rounds.push(round);

                        resolve(game);
                    } else {
                        throw new BadRequestError(
                            `Game not found by id: ${gameId}`
                        );
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    deleteGame(id: Game['id']) {
        const games = this._games;

        return new Promise<boolean>((resolve, reject) => {
            setImmediate(() => {
                if (games.has(id)) {
                    resolve(games.delete(id));
                } else {
                    reject(new BadRequestError(`Game not found by id: ${id}`));
                }
            });
        });
    }
}
