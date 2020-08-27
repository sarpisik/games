import { GameServerSide } from '@shared-types/backgammon';
import { GAME_EVENTS } from '@shared-types/game';
import { generateBackgammonGamePath } from '@shared-types/helpers';
import { generatePlayersObj } from './helpers';

export default class BackgammonGame implements GameServerSide {
    players: GameServerSide['players'];
    score: GameServerSide['score'];
    stages: GameServerSide['stages'];
    duration: GameServerSide['duration'];
    timer: GameServerSide['timer'];
    rounds: GameServerSide['rounds'];
    private _namespace: SocketIO.Namespace;

    constructor(
        public id: number,
        private _roomId: number,
        _io: SocketIO.Server
    ) {
        this.players = generatePlayersObj(-1, -1);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];

        this._namespace = _io.of(generateBackgammonGamePath(this._roomId, id));
        this._namespace.on('connection', this._onClientConnection.bind(this));
    }

    private _onClientConnection(socket: SocketIO.Socket) {
        socket.emit(
            GAME_EVENTS.JOIN_GAME,
            Object.assign({}, this.id, this.players)
        );
    }
}
