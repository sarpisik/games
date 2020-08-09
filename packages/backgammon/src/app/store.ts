import {
    Action,
    configureStore,
    MiddlewareArray,
    ThunkAction,
} from '@reduxjs/toolkit';
import { socket } from './middlewares';
import { game, notification, pointsLayout, round } from './slices';

export const store = configureStore({
    reducer: { game, notification, pointsLayout, round },
    middleware: new MiddlewareArray().concat([socket]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
