import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import aircraftReducer from './slice';
import filterReducer from './filterSlice';

export const store = configureStore({
    reducer: {
        aircraftReducer,
        filterReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Селекторы
export const selectAircrafts = (state: RootState) => state.aircraftReducer;
export const selectFilters = (state: RootState) => state.filterReducer;
