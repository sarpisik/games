import { BadRequestError } from '@shared/error';
import { CreateGame, Game } from 'types/lib/backgammon';
import { rollDices } from '../controller/socket/utils';

export default class GamesService {
    constructor(private _games: Map<number, Game>) {}

    readGame(id: number) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                if (games.has(id)) {
                    resolve(games.get(id));
                } else {
                    reject(new BadRequestError(`Game not found by id: ${id}`));
                }
            });
        });
    }

    async createGame(data: CreateGame) {
        const { players, stages } = data;

        const id = Date.now();
        const game: Game = {
            id,
            players,
            stages,
            rounds: [],
            score: { white: 0, black: 0 },
        };

        this._games.set(id, game);

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
                if (games.has(game.id)) {
                    resolve(games.set(game.id, game).get(game.id));
                } else {
                    reject(
                        new BadRequestError(`Game not found by id: ${game.id}`)
                    );
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
