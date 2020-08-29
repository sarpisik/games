import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient, User } from 'types/lib/backgammon';

export interface Room {
    id: number;
    games: Pick<
        GameClient,
        'id' | 'players' | 'duration' | 'score' | 'stages'
    >[];
    users: User[];
}

const initialState: Room = {
    id: -1,
    games: [],
    users: [],
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<Room>) {
            Object.assign(state, action.payload);
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
