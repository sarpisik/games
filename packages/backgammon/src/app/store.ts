import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { history, pointsLayout, round, game } from './slices';

export const store = configureStore({
    reducer: { history, pointsLayout, round, game },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
