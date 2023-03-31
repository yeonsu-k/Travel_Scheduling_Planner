import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

export interface DestinationConfig {
  regionId: number;
  regionName: string;
  regionImageURL: string;
  englishName: string;
  contents: string;
}

interface mainConfig {
  destinationList: DestinationConfig[];
  scheduleCnt: number;
}

const initialState: mainConfig = {
  destinationList: [],
  scheduleCnt: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDestinationList: (state, { payload: { destinationList } }) => {
      state.destinationList = destinationList;
    },
    setScheduleCnt: (state, { payload: { scheduleCnt } }) => {
      state.scheduleCnt = scheduleCnt;
    },
  },
});

export const { setDestinationList, setScheduleCnt } = mainSlice.actions;
export const selectDestinationList = (state: rootState) => state.main.destinationList;
export const selectScheduleCnt = (state: rootState) => state.main.scheduleCnt;
export default mainSlice.reducer;
