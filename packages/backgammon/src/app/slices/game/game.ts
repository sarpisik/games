import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient, PLAYERS, Game } from 'types/lib/backgammon';

const generatePlayers = (value: number) => ({
    [PLAYERS.BLACK]: value,
    [PLAYERS.WHITE]: value,
});

const initialState: GameClient = {
    id: -1,
    players: generatePlayers(-1),
    stages: 0,
    score: generatePlayers(0),
    isRoundPlayer: false,
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
        setRoundPlayer(
            state,
            action: PayloadAction<GameClient['isRoundPlayer']>
        ) {
            state.isRoundPlayer = action.payload;
        },
        addRound(state, action: PayloadAction<GameClient['rounds'][number]>) {
            state.rounds.push(action.payload);
        },
        deleteRounds(state) {
            state.rounds = [];
        },
        replaceRound(
            state,
            action: PayloadAction<GameClient['rounds'][number]>
        ) {
            state.rounds[state.rounds.length - 1] = action.payload;
        },
        undoRound(state, action: PayloadAction<GameClient['rounds']>) {
            state.rounds = action.payload;
        },
    },
});

export const {
    addRound,
    deleteRounds,
    replaceRound,
    resetCurrentRoundLayout,
    setInitialGame,
    setRoundPlayer,
    undoRound,
} = gameSlice.actions;

export default gameSlice.reducer;
