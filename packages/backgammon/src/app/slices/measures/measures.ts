import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PIXEL } from '../../../configs';
import {
    calculateContainers,
    calculateSidebar,
    calculateSizes,
    calculateTriangles,
    calculateUnit,
} from './utils';

const sizes = calculateSizes();
const containers = calculateContainers(sizes);
const triangles = calculateTriangles(sizes);
const sidebar = calculateSidebar(sizes);
const unit = calculateUnit(sizes, PIXEL);

export type Containers = typeof containers;
export type Triangles = typeof triangles;
export type Sidebar = typeof sidebar;
export type Unit = typeof unit;
export type Pixel = typeof PIXEL;

interface Measures {
    containers: Containers;
    triangles: Triangles;
    sidebar: Sidebar;
    pixel: Pixel;
    sizes: typeof sizes;
    unit: Unit;
}

const initialState: Measures = {
    containers,
    triangles,
    sidebar,
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
