import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient, PLAYERS } from 'types/lib/backgammon';

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
        setInitialGame(state, action: PayloadAction<GameClient>) {
            const { id, players, stages, score, rounds } = action.payload;
            state.id = id;
            state.players = players;
            state.rounds = rounds;
            state.score = score;
            state.stages = stages;
        },
        resetCurrentRoundLayout(state) {
            const currentRound = state.rounds[state.rounds.length - 1];
            const newRound = JSON.parse(JSON.stringify(currentRound.layout));
            newRound.availableTriangles = [];
            currentRound.layout = newRound;
        },
        setAvailableTriangles(
            state,
            action: PayloadAction<
                GameClient['rounds'][number]['availableTriangles']
            >
        ) {
            const currentRound = state.rounds[state.rounds.length - 1];
            currentRound.availableTriangles = action.payload;
        },
        setRoundPlayer(
            state,
            action: PayloadAction<GameClient['isRoundPlayer']>
        ) {
            state.isRoundPlayer = action.payload;
        },
        addRound(state, action: PayloadAction<GameClient['rounds'][number]>) {
            const round = action.payload;
            round.availableTriangles = [];
            state.rounds.push(round);
        },
        deleteRounds(state) {
            state.rounds = [];
        },
        replaceRound(
            state,
            action: PayloadAction<GameClient['rounds'][number]>
        ) {
            const round = action.payload;
            round.availableTriangles = [];
            state.rounds[state.rounds.length - 1] = round;
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
    setAvailableTriangles,
    setInitialGame,
    setRoundPlayer,
    undoRound,
} = gameSlice.actions;

export default gameSlice.reducer;
