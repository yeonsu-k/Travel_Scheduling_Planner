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
    locationURL: string;
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
  notiNumber: number;
}

const initialState: mainConfig = {
  destinationList: [],
  travelLogList: [],
  scheduleCnt: 0,
  notiNumber: 0,
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
    setNotiNumber: (state, { payload: { notiNumber } }) => {
      state.notiNumber = notiNumber;
    },
  },
});

export const { setDestinationList, setScheduleCnt, setTravelLogList, setNotiNumber } = mainSlice.actions;
export const selectDestinationList = (state: rootState) => state.main.destinationList;
export const selectTravelLogList = (state: rootState) => state.main.travelLogList;
export const selectScheduleCnt = (state: rootState) => state.main.scheduleCnt;
export const selectNotiNumber = (state: rootState) => state.main.notiNumber;

export default mainSlice.reducer;
