import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameClient } from 'types/lib/backgammon';
import { User } from '../../../types/user';

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
        addRoomUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        deleteRoomUser(state, action: PayloadAction<User['id']>) {
            const userIndex = state.users.findIndex(
                (user) => user.id === action.payload
            );
            state.users.splice(userIndex, 1);
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

export const {
    setRoom,
    addRoomUser,
    deleteRoomUser,
    setRoomGame,
} = roomSlice.actions;

export default roomSlice.reducer;
