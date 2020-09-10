import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient } from 'types/lib/backgammon';
import { generatePlayers } from 'types/lib/helpers';

export const initialState: GameClient = {
    id: -1,
    players: generatePlayers(null, null),
    stages: 0,
    score: generatePlayers(0, 0),
    isRoundPlayer: false,
    rounds: [],
    duration: 0,
    timer: generatePlayers(0, 0),
    _status: 'UNINITIALIZED',
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        editGame(state, action: PayloadAction<Partial<GameClient>>) {
            Object.assign(state, action.payload);
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
            state._status = 'INITIALIZED';
        },
        editRound(state, action: PayloadAction<GameClient['rounds'][number]>) {
            const round = action.payload;
            const rounds = state.rounds;
            for (const _r of rounds) {
                if (_r.id === round.id) {
                    Object.assign(_r, round);
                    break;
                }
            }
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
    editRound,
    deleteRounds,
    replaceRound,
    resetCurrentRoundLayout,
    setAvailableTriangles,
    editGame,
    setRoundPlayer,
    setTimer,
    undoRound,
} = gameSlice.actions;

export default gameSlice.reducer;
