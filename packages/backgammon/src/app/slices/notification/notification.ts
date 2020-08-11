import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EVENTS } from 'types/lib/backgammon';

export enum NOTIFICATION {
    WHITE_PLAYER = 'WHITE_PLAYER',
    BLACK_PLAYER = 'BLACK_PLAYER',
}

type NotificationType = NOTIFICATION | EVENTS;

interface Notification {
    type: string | NotificationType;
    message: string;
}

const initialState: Notification = {
    type: '',
    message: '',
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<Notification>) {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        deleteNotification(state) {
            state.type = '';
            state.message = '';
        },
    },
});

export const {
    setNotification,
    deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
