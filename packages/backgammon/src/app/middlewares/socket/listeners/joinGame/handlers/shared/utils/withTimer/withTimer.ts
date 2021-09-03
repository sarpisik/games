import { editGame } from '../../../../../../../../slices';
import { store } from '../../../../../../../../store';
import { withDeleteNotification } from '../../../../../../utils';

const withTimer = <P>(
    wrappedFunction: (s: typeof store) => (payload: P) => void
) => (s: typeof store) => (payload: P) => {
    s.dispatch(editGame({ _status: 'INITIALIZED' }));

    withDeleteNotification(wrappedFunction)(s)(payload);
};

export default withTimer;
