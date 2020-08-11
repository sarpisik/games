import { Socket } from 'src/connection/socket';
import { Controller, RouterType } from 'src/routes/api/shared/controller';
import { withCatch } from 'src/routes/api/shared/middleware';
import { EmitSignInUser, EVENTS, Game } from 'types/lib/backgammon';
import { GamesService } from '../service';

type GameParam = { id: string };

export default class GamesController extends Controller {
    private _namespace: SocketIO.Namespace;
    private _socket!: SocketIO.Socket;

    constructor(
        private _io: Socket,
        router: RouterType,
        private _gamesService: GamesService
    ) {
        super(router, '/games');
        this._namespace = _io.of('/backgammon');
        this._namespace.on('connection', this._handleSocket.bind(this));

        this._initializeRoutes();
    }

    private _initializeRoutes = () => {
        this.router.post(this.path, this._createGame);
        this.router.get(this.path + '/:id', this._getGame);
        this.router.put(this.path + '/:id', this._updateGame);
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

    private _updateGame = withCatch<GameParam, Game, Pick<Game, 'players'>>(
        async (req, res) => {
            const { params, body } = req;
            const { id } = params;
            const { black } = body.players;

            const game = await this._gamesService.readGame(parseInt(id));
            game.players.black = black;

            const uptGame = await this._gamesService.updateGame(game);

            res.send(uptGame);
        }
    );

    private async _handleSocket(socket: SocketIO.Socket) {
        console.log('client connected');
        this._socket = socket;

        socket.on(EVENTS.JOIN_ROOM, this._handleRoom.bind(this));
    }

    private async _handleRoom(roomName: string) {
        this._socket.join(roomName);
        const roomSocket = this._socket.to(roomName);
        // console.log(this);

        const game = await this._gamesService.readGame(parseInt(roomName));
        this._emitGameUpdate(game);
        roomSocket.on(EVENTS.SIGN_IN_USER, this._signInUser.bind(this));
        // this._roomSocket.on(EVENTS.ROUND, round(this._roomSocket));
        // this._roomSocket.on(
        //     EVENTS.BROKEN_POINT_ROUND,
        //     handleBrokenPoint(this._roomSocket)
        // );
        // this._roomSocket.on(
        //     EVENTS.COLLECT_POINT_ROUND,
        //     handleCollectPoint(this._roomSocket)
        // );
        // this._roomSocket.on(EVENTS.UNDO_ROUND, handleUndoRound(this._roomSocket));
    }

    private async _signInUser(data: EmitSignInUser) {
        const { id, players } = data;

        const game = await this._gamesService.readGame(id);
        game.players = Object.assign(game.players, players);
        this._emitGameUpdate(game);
    }
    private _emitGameUpdate(game: Game) {
        console.log(game);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._namespace.to(game.id.toString()).emit(EVENTS.GAME_UPDATE, game);
        // this._namespace.to(game.id.toString()).emit(EVENTS.GAME_UPDATE, game);
    }
}
