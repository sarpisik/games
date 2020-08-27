import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CONNECTION_STATUS {
    PRE_CONNECT = 'PRE_CONNECT',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    DISCONNECTED = 'DISCONNECTED',
}

interface Connection {
    status: CONNECTION_STATUS;
}

const initialState: Connection = {
    status: CONNECTION_STATUS.PRE_CONNECT,
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        setConnectionStatus(state, action: PayloadAction<CONNECTION_STATUS>) {
            state.status = action.payload;
        },
    },
});

export const { setConnectionStatus } = connectionSlice.actions;

export default connectionSlice.reducer;
