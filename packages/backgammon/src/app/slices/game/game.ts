import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Game = any;

const initialState: Game = {
    __typename: 'Game',
    id: '',
    white: null,
    black: null,
    rounds: null,
    createdAt: '',
    updatedAt: '',
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGame(state, action: PayloadAction<Game>) {
            state.black = action.payload.black;
            state.createdAt = action.payload.createdAt;
            state.id = action.payload.id;
            state.rounds = action.payload.rounds;
            state.updatedAt = action.payload.updatedAt;
            state.white = action.payload.white;
        },
    },
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
