import { configureStore } from '@reduxjs/toolkit';
import commonSettingsSlice from './common-settings-slice';
import pathfindingVisualizerSlice from './pathfinding-visualizer-slice';

import sortingVisualizerSlice from './sorting-visualizer-slice';


const store = configureStore({
  reducer: {
    sortingVisualizer: sortingVisualizerSlice.reducer,
    pathfindingVisualizer: pathfindingVisualizerSlice.reducer,
    commonSettings: commonSettingsSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;