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
        resetCurrentRoundLayout(state) {
            const currentRound = state.rounds[state.rounds.length - 1];
            currentRound.layout = JSON.parse(
                JSON.stringify(currentRound.layout)
            );
        },
        addRound(state, action: PayloadAction<Game['rounds'][number]>) {
            state.rounds.push(action.payload);
        },
    },
});

export const { resetCurrentRoundLayout, setGame, addRound } = gameSlice.actions;

export default gameSlice.reducer;
