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
    private _roomName: string;

    constructor(
        public id: number,
        private _roomId: number,
        private _namespace: SocketIO.Namespace
    ) {
        this.players = generatePlayersObj(-1, -1);
        this.score = generatePlayersObj(0, 0);
        this.stages = 1;
        this.duration = 60;
        this.timer = generatePlayersObj(60, 60);
        this.rounds = [];

        this._roomName = generateBackgammonGamePath(this._roomId, id);
        console.log(this._roomName);
        this._namespace = _namespace.to(this._roomName);
        this._namespace.on(
            GAME_EVENTS.INITIALIZE_GAME,
            this._onInitializeGame.bind(this)
        );
    }

    private _onInitializeGame() {
        const payload = Object.assign({}, this.id, this.players);
        console.log(payload);

        this._namespace.emit(this._roomName, {
            type: GAME_EVENTS.JOIN_GAME,
            payload,
        });
    }
}
