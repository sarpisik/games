import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EVENTS } from 'types/lib/backgammon';

interface Notification {
    type: string | EVENTS.SKIP_ROUND;
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
