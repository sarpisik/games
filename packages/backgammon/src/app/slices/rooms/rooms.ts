import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmitJoinRooms } from 'types/lib/room';

interface Rooms {
    ids: number[];
}

const initialState: Rooms = {
    ids: [],
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms(state, action: PayloadAction<EmitJoinRooms>) {
            state.ids = action.payload;
        },
    },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
