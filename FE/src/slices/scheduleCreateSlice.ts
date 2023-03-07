import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { addDays, format } from "date-fns";

export interface basicConfig {
  id: number;
  image: string;
  name: string;
}

interface scheduleCreateConfig {
  local: string;
  date: {
    start: string;
    end: string;
  };
  hotel: (basicConfig | null)[];
  place: {
    id: number;
    image: string;
    name: string;
    time: string;
  }[];
  pointPlace: {
    start: basicConfig | null;
    end: basicConfig | null;
  };
}

const initialState: scheduleCreateConfig = {
  local: "부산",
  date: {
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  },
  hotel: [],
  place: [],
  pointPlace: {
    start: null,
    end: null,
  },
};

const scheduleCreateSlice = createSlice({
  name: "scheduleCreate",
  initialState,
  reducers: {
    setLocal: (state, { payload }) => {
      state.local = payload;
    },
    setDate: (state, { payload }) => {
      state.date = payload;
    },
    setHotelList: (state, { payload }) => {
      state.hotel = payload;
    },
    setPlaceList: (state, { payload }) => {
      state.place = payload;
    },
    setPlaceTime: (state, { payload }) => {
      const changedIdx = payload.index;
      state.place[changedIdx].time = payload.time;
    },
    deletePointPlaceList: (state, { payload }) => {
      const changedPosition = payload.position;
      if (changedPosition === 0) {
        state.pointPlace.start = payload.value;
      } else {
        state.pointPlace.end = payload.value;
      }
    },
  },
});
export const { setLocal, setDate, setHotelList, setPlaceList, setPlaceTime, deletePointPlaceList } =
  scheduleCreateSlice.actions;

export const selectLocal = (state: rootState) => state.scheduleCreate.local;
export const selectDate = (state: rootState) => state.scheduleCreate.date;
export const selectHotelList = (state: rootState) => state.scheduleCreate.hotel;
export const selectPlaceList = (state: rootState) => state.scheduleCreate.place;
export const selectPointPlace = (state: rootState) => state.scheduleCreate.pointPlace;

export default scheduleCreateSlice.reducer;
