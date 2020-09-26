import { withNotification } from '../withNotification';

export default function withSpinner(action: any, store: any) {
    // Ignore payload param.
    // @ts-ignore
    withNotification(action.type)(store)();
    return action.payload;
}
