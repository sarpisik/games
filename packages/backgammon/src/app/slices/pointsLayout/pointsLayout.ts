import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_LAYOUT } from './constants';

interface State {
    layout: typeof INITIAL_LAYOUT;
}

interface TrianglePayload {
    index: number;
    triangle: number[];
}

const initialState: State = { layout: INITIAL_LAYOUT };

export const pointsLayoutSlice = createSlice({
    name: 'pointLayouts',
    initialState,
    reducers: {
        resetLayout(state) {
            state.layout = JSON.parse(JSON.stringify(state.layout));
        },
        setLayout(state, action: PayloadAction<State['layout']>) {
            state.layout = action.payload;
        },
        editLayoutTriangle(state, action: PayloadAction<TrianglePayload>) {
            const { index, triangle } = action.payload;
            state.layout[index] = triangle;
        },
        editLayout(
            state,
            action: PayloadAction<{
                prev: TrianglePayload;
                next: TrianglePayload;
            }>
        ) {
            const { prev, next } = action.payload;
            state.layout[prev.index] = prev.triangle;
            state.layout[next.index] = next.triangle;
        },
    },
});

export const {
    editLayout,
    editLayoutTriangle,
    resetLayout,
    setLayout,
} = pointsLayoutSlice.actions;

export default pointsLayoutSlice.reducer;
