import { withNotification } from '../withNotification';

type WithNotification = typeof withNotification;

export default function withSpinner<P>(
    action: { type: Parameters<WithNotification>[0]; payload: P },
    store: Parameters<ReturnType<WithNotification>>[0]
) {
    withNotification(action.type)(store)(undefined);
    return action.payload;
}
