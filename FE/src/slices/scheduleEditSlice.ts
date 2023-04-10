import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { basicConfig } from "slices/scheduleCreateSlice";

export interface scheduleConfig {
  location: basicConfig;
  day: number;
  sequence: number;
  startTime: string;
  endTime: string;
  duration: number;
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
    resetKeepPlaceList: (state) => {
      state.keepPlaceList = [];
    },
    setStayTime: (state, { payload: { day, index, startTime, endTime } }) => {
      state.scheduleList[day - 1][index].startTime = startTime;
      state.scheduleList[day - 1][index].endTime = endTime;
      console.log("startTime", state.scheduleList[day - 1][index].startTime);
      console.log("endTime: ", state.scheduleList[day - 1][index].endTime);
    },
    setDuration: (state, { payload: { day, index, duration } }) => {
      state.scheduleList[day - 1][index].duration = duration;
    },
    setscheduleList: (state, action: PayloadAction<scheduleEditConfig["scheduleList"]>) => {
      state.scheduleList = action.payload;
    },
  },
});

export const { setKeepPlaceList, resetKeepPlaceList, setStayTime, setDuration, setscheduleList } =
  scheduleEditSlice.actions;

export const selectKeepPlaceList = (state: rootState) => state.scheduleEdit.keepPlaceList;
export const selectScheduleList = (state: rootState) => state.scheduleEdit.scheduleList;

export default scheduleEditSlice.reducer;
