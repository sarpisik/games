import BackgammonGame from '../../game';

export default function setStatus(
    this: BackgammonGame,
    status: BackgammonGame['_status']
) {
    this._status = status;
}
