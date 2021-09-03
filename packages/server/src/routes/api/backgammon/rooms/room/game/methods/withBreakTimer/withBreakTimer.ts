import { EmitBase } from '@shared-types/backgammon';
import BackgammonGame from '../../game';

export default function withBreakTimer<Data extends EmitBase>(
    this: BackgammonGame,
    eventHandler: (data: Data) => unknown
) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return async function breakTimer(data: Data) {
        // Break timer
        self._tRef && clearTimeout(self._tRef);
        delete self._t;

        return eventHandler.call(self, data);
    };
}
