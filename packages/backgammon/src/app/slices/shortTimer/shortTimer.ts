import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SHORT_TIMER } from 'types/lib/constants';

interface ShortTimer {
    seconds: number;
}

const initialState: ShortTimer = {
    seconds: SHORT_TIMER,
};

export const shortTimerSlice = createSlice({
    name: 'shortTimer',
    initialState,
    reducers: {
        setShortTimer(state, action: PayloadAction<ShortTimer>) {
            state.seconds = action.payload.seconds;
        },
    },
});

export const { setShortTimer } = shortTimerSlice.actions;

export default shortTimerSlice.reducer;
