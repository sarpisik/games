import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum FEEDBACK_STATUS {
    UNFETCH = 'UNFETCH',
    FETCHING = 'FETCHING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

interface Feedback {
    status: FEEDBACK_STATUS;
    message?: unknown;
}

const initialFeedback: Feedback = {
    status: FEEDBACK_STATUS.UNFETCH,
    message: '',
};

const initialState = {
    editRoomGame: initialFeedback,
    setUser: initialFeedback,
};

export type Feedbacks = typeof initialState;

export const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        setFeedback(
            state,
            action: PayloadAction<Partial<typeof initialState>>
        ) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setFeedback } = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
