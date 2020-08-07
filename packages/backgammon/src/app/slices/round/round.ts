import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PLAYERS } from '../../../components/Board/constants';
import { NEXT_PLAYER, Round } from './constants';
import { rollDices } from './utils';

const initialState: Round[] = [];

export const roundSlice = createSlice({
    name: 'round',
    initialState,
    reducers: {
        setInitialRound(state) {
            const round: Readonly<Round> = {
                attempt: 0,
                player: PLAYERS.BLACK,
                turn: 1,
                brokens: { [PLAYERS.WHITE]: 0, [PLAYERS.BLACK]: 0 },
                dice: rollDices(),
                id: Date.now(),
            };

            state.push(round);
        },
        setNextRound(state) {
            const [lastRound] = state.slice(-1);
            const round: Round = Object.assign({}, lastRound, {
                attempt: 0,
                player: NEXT_PLAYER[lastRound.player],
                turn: ++lastRound.turn,
                dice: rollDices(),
                id: Date.now(),
            });

            state.push(round);
        },
        increaseAttempt(state) {
            const round = state[state.length - 1];
            round.attempt += 1;
        },
        increaseBroken(state, action: PayloadAction<keyof Round['brokens']>) {
            const player = action.payload;
            const round = state[state.length - 1];

            round.brokens[player] += 1;
        },
        decreaseBroken(state, action: PayloadAction<keyof Round['brokens']>) {
            const player = action.payload;
            const round = state[state.length - 1];

            round.brokens[player] -= 1;
        },
        setMovement(state, action: PayloadAction<number>) {
            const diceIndex = action.payload;
            const round = state[state.length - 1];
            round.dice.splice(diceIndex, 1);

            const shouldJumpToNextRound = round.dice.length < 1;
            if (shouldJumpToNextRound) {
                const [lastRound] = state.slice(-1);
                const round: Round = Object.assign({}, lastRound, {
                    player: NEXT_PLAYER[lastRound.player],
                    turn: ++lastRound.turn,
                    dice: rollDices(),
                    movements: [],
                });

                state.push(round);
            }
        },
        undoMovement(state, action: PayloadAction<Round>) {
            state[state.length - 1] = action.payload;
        },
        resetRound(state) {
            state = [];
        },
    },
});

export const {
    increaseBroken,
    decreaseBroken,
    resetRound,
    setInitialRound,
    increaseAttempt,
    setMovement,
    setNextRound,
    undoMovement,
} = roundSlice.actions;

export default roundSlice.reducer;
