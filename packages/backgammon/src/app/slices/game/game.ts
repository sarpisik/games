import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient } from 'types/lib/backgammon';
import { ChatMessageServer } from 'types/lib/game';
import { generatePlayers } from 'types/lib/helpers';
import { dateToHours } from './utils';

export const initialState: GameClient = {
    id: -1,
    players: generatePlayers(null, null),
    stages: 0,
    score: generatePlayers(0, 0),
    isRoundPlayer: false,
    rounds: [],
    duration: 0,
    timer: generatePlayers(0, 0),
    chat: { status: 'SUCCESS', messages: [] },
    _status: 'UNINITIALIZED',
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        editGame(state, action: PayloadAction<Partial<GameClient>>) {
            Object.assign(state, action.payload);
        },
        editChat(state, action: PayloadAction<Partial<GameClient['chat']>>) {
            Object.assign(state.chat, action.payload);
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
            console.log(action.payload);

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
        addMessage(
            state,
            action: PayloadAction<
                Pick<GameClient['chat'], 'status'> & {
                    message: ChatMessageServer;
                }
            >
        ) {
            const { status, message } = action.payload;
            const time = dateToHours(message.time);
            // @ts-ignore
            message.time = time;
            state.chat.status = status;
            // @ts-ignore
            state.chat.messages.unshift(message);
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
    addMessage,
    editRound,
    deleteRounds,
    replaceRound,
    resetCurrentRoundLayout,
    setAvailableTriangles,
    editGame,
    editChat,
    setRoundPlayer,
    setTimer,
    undoRound,
} = gameSlice.actions;

export default gameSlice.reducer;
