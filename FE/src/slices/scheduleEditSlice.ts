import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

export interface placeInfoConfig {
  id: number;
  image: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  time: string;
}

export interface fullScheduleListConfig {
  day: number;
  dayList: placeInfoConfig[];
}

interface scheduleEditConfig {
  fullScheduleList: fullScheduleListConfig[];
  keepPlaceList: placeInfoConfig[];
}

const initialState: scheduleEditConfig = {
  fullScheduleList: [],
  keepPlaceList: [
    // {
    //   id: 8,
    //   img: "src",
    //   placeName: "월정리 해수욕장",
    //   time: "2시간 0분",
    //   startTime: "10:00",
    //   endTime: "12:00",
    // },
  ],
};

const scheduleEditSlice = createSlice({
  name: "scheduleEdit",
  initialState,
  reducers: {
    setFullScheduleList: (state, { payload }) => {
      state.fullScheduleList = payload;
    },
    setKeepPlaceList: (state, { payload }) => {
      state.keepPlaceList = payload;
    },
  },
});

export const { setFullScheduleList, setKeepPlaceList } = scheduleEditSlice.actions;

export const selectFullScheduleList = (state: rootState) => state.scheduleEdit.fullScheduleList;
export const selectKeepPlaceList = (state: rootState) => state.scheduleEdit.keepPlaceList;

export default scheduleEditSlice.reducer;
