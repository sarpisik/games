import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User as U } from '../../../types/user';

export interface User extends U {
    state: 'INITIAL' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: User = {
    id: '',
    name: '',
    email: '',
    description: '',
    backgammon: {
        score: 0,
        wins: 0,
        loses: 0,
        escapes: 0,
    },
    createdAt: '',
    updatedAt: '',
    owner: '',
    state: 'INITIAL',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState(state, action: PayloadAction<Pick<User, 'state'>>) {
            Object.assign(state, action.payload);
        },
        setUser(state, action: PayloadAction<U>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setUser, setUserState } = userSlice.actions;

export default userSlice.reducer;
