import {
    Action,
    configureStore,
    MiddlewareArray,
    ThunkAction,
} from '@reduxjs/toolkit';
import { socket } from './middlewares';
import { game, measures, notification, shortTimer, user } from './slices';

export const store = configureStore({
    reducer: { game, notification, user, measures, shortTimer },
    middleware: new MiddlewareArray().concat([socket]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
