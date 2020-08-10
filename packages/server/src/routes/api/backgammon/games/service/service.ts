import { rollDices } from 'src/sockets/games/backgammon/utils';
import { Game, PLAYERS } from 'types/lib/backgammon';
import { layout } from '../constants';

export default class GamesService {
    constructor(private _games: Map<number, Game>) {}

    readGame(id: number) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                if (games.has(id)) {
                    resolve(games.get(id));
                } else {
                    reject(`Game not found by id: ${id}`);
                }
            });
        });
    }

    async createGame(data: Pick<Game, 'players' | 'stages'>) {
        const { players, stages } = data;

        const id = Date.now();
        const dice = await rollDices();
        const round: Game['rounds'][number] = {
            attempt: 0,
            player: PLAYERS.WHITE,
            turn: 1,
            brokens: {
                [PLAYERS.WHITE]: 0,
                [PLAYERS.BLACK]: 0,
            },
            collected: {
                [PLAYERS.WHITE]: 0,
                [PLAYERS.BLACK]: 0,
            },
            dice,
            id: Date.now(),
            layout,
        };
        const game: Game = {
            id,
            players,
            stages,
            rounds: [round],
            score: { white: 0, black: 0 },
        };

        this._games.set(id, game);

        return game;
    }

    updateGame(game: Game) {
        const games = this._games;

        return new Promise<Game>((resolve, reject) => {
            setImmediate(() => {
                if (games.has(game.id)) {
                    resolve(games.set(game.id, game).get(game.id));
                } else {
                    reject(`Game not found by id: ${game.id}`);
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
                    reject(`Game not found by id: ${id}`);
                }
            });
        });
    }
}
