import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterSliceState {
    page: number;
}

const initialState: FilterSliceState = {
    page: 1
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
          state.page = action.payload;
        }
    }
})

export const { setCurrentPage } = filterSlice.actions

export default filterSlice.reducer