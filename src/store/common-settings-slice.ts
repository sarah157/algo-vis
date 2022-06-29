import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Speed } from "../models";

export interface CommonSettingsState {
    speed: Speed
}

const initialState: CommonSettingsState = {
    speed: Speed.fast
}

const commonSettingsSlice = createSlice({
    name: "commonSettings",
    initialState: initialState,
    reducers: {
        setSpeed(state, action: PayloadAction<Speed>) {
            state.speed = action.payload;
        }
    }
})

export const {setSpeed} = commonSettingsSlice.actions;

export default commonSettingsSlice;