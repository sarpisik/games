import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmitRooms } from 'types/lib/rooms';

interface Rooms {
    rooms: EmitRooms;
}

const initialState: Rooms = {
    rooms: [],
};

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms(state, action: PayloadAction<EmitRooms>) {
            Object.assign(state.rooms, action.payload);
        },
    },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
