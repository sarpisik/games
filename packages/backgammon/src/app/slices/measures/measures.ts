import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PIXEL } from '../../../config';
import {
    calculateBlocks,
    calculateContainers,
    calculateSizes,
    calculateTriangles,
    calculateUnit,
} from './utils';

const sizes = calculateSizes();
const blocks = calculateBlocks(sizes);
const containers = calculateContainers(sizes);
const triangles = calculateTriangles(sizes);
const unit = calculateUnit(sizes, PIXEL);

export type Blocks = typeof containers;
export type Containers = typeof blocks;
export type Triangles = typeof triangles;
export type Unit = typeof unit;
export type Pixel = typeof PIXEL;

interface Measures {
    blocks: Blocks;
    containers: Containers;
    triangles: Triangles;
    pixel: Pixel;
    sizes: typeof sizes;
    unit: Unit;
}

const initialState: Measures = {
    blocks,
    containers,
    triangles,
    pixel: PIXEL,
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
