import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient } from 'types/lib/backgammon';

export interface Room {
    id: number;
    games: Pick<
        GameClient,
        'id' | 'players' | 'duration' | 'score' | 'stages'
    >[];
}

const initialState: Room = {
    id: -1,
    games: [],
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<Room>) {
            state.id = action.payload.id;
            state.games = action.payload.games;
        },
        setRoomGame(state, action: PayloadAction<Room['games'][number]>) {
            const _game = action.payload;
            const gameId = state.games.findIndex(
                (game) => game.id === _game.id
            );
            if (gameId >= 0) {
                state.games[gameId] = _game;
            }
        },
    },
});

export const { setRoom, setRoomGame } = roomSlice.actions;

export default roomSlice.reducer;
