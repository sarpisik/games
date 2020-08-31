import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmitScore, GameClient } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';
import { EmitGame } from 'types/lib/game';

const initialState: GameClient = {
    id: -1,
    players: generatePlayers(null, null),
    stages: 0,
    score: generatePlayers(0, 0),
    isRoundPlayer: false,
    rounds: [],
    duration: 0,
    timer: generatePlayers(0, 0),
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setInitialGame(state, action: PayloadAction<GameClient>) {
            const {
                id,
                players,
                stages,
                score,
                rounds,
                timer,
            } = action.payload;
            state.id = id;
            state.players = players;
            state.rounds = rounds;
            state.score = score;
            state.stages = stages;
            state.timer = timer;
        },
        resetCurrentRoundLayout(state) {
            const currentRound = state.rounds[state.rounds.length - 1];
            const newLayout = JSON.parse(JSON.stringify(currentRound.layout));
            currentRound.availableTriangles = [];
            currentRound.layout = newLayout;
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
        setTimer(state, action: PayloadAction<GameClient['timer']>) {
            state.timer = action.payload;
        },
        addRound(state, action: PayloadAction<GameClient['rounds'][number]>) {
            const round = action.payload;
            round.availableTriangles = [];
            state.rounds.push(round);
        },
        setNextStage(state, action: PayloadAction<EmitScore>) {
            const { score, stages } = action.payload;
            state.score = score;
            state.stages = stages;
            state.rounds = [];
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
    setNextStage,
    setTimer,
} = gameSlice.actions;

export default gameSlice.reducer;
