import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/user';

export const initialState: User = {
    id: '',
    name: '',
    email: '',
    wins: 0,
    loses: 0,
    escapes: 0,
    createdAt: '',
    updatedAt: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            Object.assign(state, action.payload);
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
