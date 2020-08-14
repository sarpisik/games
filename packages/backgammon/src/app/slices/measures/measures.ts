import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    calculateContainers,
    calculateSizes,
    calculateBlocks,
    calculateUnit,
} from './utils';
import { PIXEL } from './contants';

const sizes = calculateSizes();
const blocks = calculateBlocks(sizes);
const containers = calculateContainers(sizes);
const unit = calculateUnit(sizes, PIXEL.PIXEL);

export type Blocks = typeof containers;
export type Containers = typeof blocks;
export type Unit = typeof unit;
export type Pixel = typeof PIXEL['PIXEL'];

interface Measures {
    blocks: Blocks;
    containers: Containers;
    pixel: Pixel;
    sizes: typeof sizes;
    unit: Unit;
}

const initialState: Measures = {
    blocks,
    containers,
    pixel: PIXEL['PIXEL'],
    sizes,
    unit,
};

export const measuresSlice = createSlice({
    name: 'measures',
    initialState,
    reducers: {
        setSizes(state, action: PayloadAction<Measures['sizes']>) {
            state.sizes = action.payload;
        },
        setContainers(state, action: PayloadAction<Measures['containers']>) {
            state.containers = action.payload;
        },
    },
});

export const { setSizes, setContainers } = measuresSlice.actions;

export default measuresSlice.reducer;