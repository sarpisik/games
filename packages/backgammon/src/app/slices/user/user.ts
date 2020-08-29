import { User } from 'types/lib/backgammon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = User;

export const initialState: UserType = { id: -1, name: '', email: '' };

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
