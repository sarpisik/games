import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BACKGAMMON_TYPES } from 'types';

type Game = BACKGAMMON_TYPES.Game;

const initialState: Game = {
    id: -1,
    players: { black: -1, white: -1 },
    stages: 0,
    score: { black: 0, white: 0 },
    rounds: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setInitialGame(state, action: PayloadAction<Game>) {
            const { id, players, stages, score, rounds } = action.payload;
            state.id = id;
            state.players = players;
            state.rounds = rounds;
            state.score = score;
            state.stages = stages;
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
        deleteRounds(state) {
            state.rounds = [];
        },
        replaceRound(state, action: PayloadAction<Game['rounds'][number]>) {
            state.rounds[state.rounds.length - 1] = action.payload;
        },
        undoRound(state, action: PayloadAction<Game['rounds']>) {
            state.rounds = action.payload;
        },
    },
});

export const {
    resetCurrentRoundLayout,
    setInitialGame,
    addRound,
    undoRound,
    replaceRound,
    deleteRounds,
} = gameSlice.actions;

export default gameSlice.reducer;
