import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { History } from './constants';

const initialState: History[] = [];

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistory(state, action: PayloadAction<History>) {
            state.push(action.payload);
        },
        undoHistory(state) {
            state.pop();
        },
    },
});

export const { setHistory, undoHistory } = historySlice.actions;

export default historySlice.reducer;
