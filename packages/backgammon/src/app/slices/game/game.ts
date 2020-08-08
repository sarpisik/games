import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BACKGAMMON_TYPES } from 'types';

type Game = BACKGAMMON_TYPES.Game;

const initialState: Game = {
    id: '',
    white: '',
    black: '',
    rounds: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<Game>) {
            state.id = action.payload.id;
            state.black = action.payload.black;
            state.rounds = action.payload.rounds;
            state.white = action.payload.white;
        },
    },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
