import { deleteNotification } from '../../../../slices';
import { store } from '../../../../store';

const withDeleteNotification = <S extends typeof store, P>(
    wrappedFunction: (s: typeof store) => (payload: P) => void
) => (s: S) => (payload: P) => {
    const { notification } = s.getState();
    const { type, message } = notification;
    const shouldClearNotification = type && message;
    shouldClearNotification && s.dispatch(deleteNotification());

    wrappedFunction(s)(payload);
};

export default withDeleteNotification;
