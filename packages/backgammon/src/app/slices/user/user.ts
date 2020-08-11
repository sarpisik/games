import { User } from 'types/lib/backgammon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = User;

const initialState: UserType = { id: -1 };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn(state, action: PayloadAction<User['id']>) {
            state.id = action.payload;
        },
        signOut(state) {
            state = initialState;
        },
    },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
