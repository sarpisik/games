import { Socket } from 'src/connection/socket';
import { Controller, RouterType } from 'src/routes/api/shared/controller';
import { withCatch } from 'src/routes/api/shared/middleware';
import { Game } from 'types/lib/backgammon';
import { GamesService } from '../service';
import { handleSocket } from './socket';

type GameParam = { id: string };

export default class GamesController extends Controller {
    private _namespace: SocketIO.Namespace;

    constructor(
        socket: Socket,
        router: RouterType,
        private _gamesService: GamesService
    ) {
        super(router, '/games');
        this._namespace = socket.of('/backgammon');
        this._namespace.on('connection', handleSocket(this._namespace));

        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.post(this.path, this._createGame);
        this.router.get(this.path + '/:id', this._getGame);
        // this.router.put(this.path + '/:id', this._updateGame);
        // this.router.delete(this.path + '/:id', this._deleteGame);
    };

    private _getGame = withCatch<GameParam, Game>(async (req, res) => {
        const { id } = req.params;

        const game = await this._gamesService.readGame(parseInt(id));

        res.send(game);
    });

    private _createGame = withCatch<
        any,
        Game,
        Parameters<GamesService['createGame']>[0]
    >(async (req, res) => {
        const { players, stages } = req.body;

        const game = await this._gamesService.createGame({ players, stages });

        res.send(game);
    });
}
