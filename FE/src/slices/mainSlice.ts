import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import React from "react";

interface mainConfig {
  destinationList: DestinationConfig[];
}

export interface DestinationConfig {
  regionId: number;
  regionName: string;
  regionImageURL: string;
  englishName: string;
  contents: string;
}

const initialState: mainConfig = {
  destinationList: [],
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDestinationList: (state, { payload: { destinationList } }) => {
      state.destinationList = destinationList;
    },
  },
});

export const { setDestinationList } = mainSlice.actions;
export const selectDestinationList = (state: rootState) => state.main.destinationList;
export default mainSlice.reducer;
