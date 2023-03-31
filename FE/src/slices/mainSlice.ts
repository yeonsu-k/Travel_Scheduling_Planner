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

export interface locationConfig {
  location: {
    address: string;
    locationName: string;
  };
}

export interface TravelLogConfig {
  hostEmail: string;
  scheduleLocations: locationConfig[];
  scheduleName: string;
  logImg: string;
  regionEng: string;
  regionId: number;
}

interface mainConfig {
  destinationList: DestinationConfig[];
  travelLogList: TravelLogConfig[];
  scheduleCnt: number;
}

const initialState: mainConfig = {
  destinationList: [],
  travelLogList: [],
  scheduleCnt: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDestinationList: (state, { payload: { destinationList } }) => {
      state.destinationList = destinationList;
    },
    setTravelLogList: (state, { payload: { travelLogList } }) => {
      state.travelLogList = travelLogList;
    },
    setScheduleCnt: (state, { payload: { scheduleCnt } }) => {
      state.scheduleCnt = scheduleCnt;
    },
  },
});

export const { setDestinationList, setScheduleCnt, setTravelLogList } = mainSlice.actions;
export const selectDestinationList = (state: rootState) => state.main.destinationList;
export const selectTravelLogList = (state: rootState) => state.main.travelLogList;
export const selectScheduleCnt = (state: rootState) => state.main.scheduleCnt;
export default mainSlice.reducer;
