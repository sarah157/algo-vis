import { configureStore } from '@reduxjs/toolkit';

import sortVisualizerSlice from './sorting-visualizer-slice';


const store = configureStore({
  reducer: {sortingVisualizer: sortVisualizerSlice.reducer},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;