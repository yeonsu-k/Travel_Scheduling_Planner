import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { basicConfig } from "slices/scheduleCreateSlice";

export interface scheduleConfig {
  location: basicConfig;
  day: number;
  sequence: number;
  startTime: string;
  endTime: string;
}

interface scheduleEditConfig {
  keepPlaceList: basicConfig[];
  scheduleList: scheduleConfig[][];
}

const initialState: scheduleEditConfig = {
  keepPlaceList: [],
  scheduleList: [],
};

const scheduleEditSlice = createSlice({
  name: "scheduleEdit",
  initialState,
  reducers: {
    setKeepPlaceList: (state, { payload }) => {
      state.keepPlaceList = payload;
    },
    setStayTime: (state, { payload: { day, index, startTime, endTime } }) => {
      state.scheduleList[day - 1][index].startTime = startTime;
      state.scheduleList[day - 1][index].endTime = endTime;
      console.log("startTime", state.scheduleList[day - 1][index].startTime);
      console.log("endTime: ", state.scheduleList[day - 1][index].endTime);
    },
    setscheduleList: (state, action: PayloadAction<scheduleEditConfig["scheduleList"]>) => {
      state.scheduleList = action.payload;
    },
  },
});

export const { setKeepPlaceList, setStayTime, setscheduleList } = scheduleEditSlice.actions;

export const selectKeepPlaceList = (state: rootState) => state.scheduleEdit.keepPlaceList;
export const selectScheduleList = (state: rootState) => state.scheduleEdit.scheduleList;

export default scheduleEditSlice.reducer;
