import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FEEDBACK_STATUS {
    UNFETCH = 'UNFETCH',
    FETCHING = 'FETCHING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

interface Feedback {
    status: FEEDBACK_STATUS | '';
    message?: unknown;
}

const initialFeedback: Feedback = {
    status: '',
    message: '',
};

const initialState = {
    editRoomGame: initialFeedback,
};

export type Feedbacks = typeof initialState;

export const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        setFeedback(
            state,
            action: PayloadAction<
                typeof initialState[keyof typeof initialState]
            >
        ) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setFeedback } = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
