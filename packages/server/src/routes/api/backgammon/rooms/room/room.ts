import { generateBackgammonRoomPath } from '@shared-types/helpers';
import { BackgammonGame } from './game';
import { RoomType } from './types';

export default class BackgammonRoom implements RoomType {
    games: RoomType['games'];

    constructor(public id: number, private _namespace: SocketIO.Namespace) {
        const users = new Set();

        this._namespace = _namespace.to(generateBackgammonRoomPath(id));

        this.games = [];
        for (let i = 1; i <= 10; i++) {
            this.games.push(new BackgammonGame(i, id, _namespace));
        }
    }
}
