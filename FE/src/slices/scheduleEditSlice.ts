import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { basicConfig } from "slices/scheduleCreateSlice";

export interface placeInfoConfig {
  id: number;
  image: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  time: string;
  startTime: string;
  endTime: string;
}

export interface fullScheduleListConfig {
  day: number;
  startHour: number;
  startMinute: number;
  dayList: placeInfoConfig[];
}

interface scheduleConfig {
  location: basicConfig;
  day: number;
  sequence: number;
  startTime: string;
  endTime: string;
}

interface scheduleEditConfig {
  fullScheduleList: fullScheduleListConfig[];
  keepPlaceList: placeInfoConfig[];
  scheduleList: scheduleConfig[][];
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
  scheduleList: [],
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
    setStayTime: (state, { payload: { day, index, startTime, endTime } }) => {
      state.fullScheduleList[day - 1].dayList[index].startTime = startTime;
      state.fullScheduleList[day - 1].dayList[index].endTime = endTime;
      console.log("startTime", state.fullScheduleList[day - 1].dayList[index].startTime);
      console.log("endTime: ", state.fullScheduleList[day - 1].dayList[index].endTime);
    },
    setscheduleList: (state, action: PayloadAction<scheduleEditConfig["scheduleList"]>) => {
      state.scheduleList = action.payload;
    },
  },
});

export const { setFullScheduleList, setKeepPlaceList, setStayTime, setscheduleList } = scheduleEditSlice.actions;

export const selectFullScheduleList = (state: rootState) => state.scheduleEdit.fullScheduleList;
export const selectKeepPlaceList = (state: rootState) => state.scheduleEdit.keepPlaceList;
export const selectScheduleList = (state: rootState) => state.scheduleEdit.scheduleList;

export default scheduleEditSlice.reducer;
