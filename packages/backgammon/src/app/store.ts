import {
    Action,
    configureStore,
    MiddlewareArray,
    ThunkAction,
} from '@reduxjs/toolkit';
import { socket } from './middlewares';
import {
    connection,
    feedbacks,
    game,
    measures,
    notification,
    room,
    rooms,
    shortTimer,
    user,
} from './slices';

export const store = configureStore({
    reducer: {
        connection,
        feedbacks,
        game,
        notification,
        user,
        measures,
        room,
        rooms,
        shortTimer,
    },
    middleware: new MiddlewareArray().concat([socket]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
