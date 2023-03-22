import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { addDays, format } from "date-fns";

export interface basicConfig {
  id: number;
  image: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface scheduleCreateConfig {
  local: string;
  date: {
    start: string;
    end: string;
  };
  hotel: (basicConfig | null)[];
  place: {
    onePlace: basicConfig;
    time: string;
  }[];
  pointPlace: (basicConfig | null)[];
  marker: {
    info: basicConfig;
    type: string;
  }[];
}

const initialState: scheduleCreateConfig = {
  local: "서울",
  date: {
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  },
  hotel: Array.from({ length: 2 }, () => null),
  place: [],
  pointPlace: Array.from({ length: 2 }, () => null),
  marker: [],
};

const scheduleCreateSlice = createSlice({
  name: "scheduleCreate",
  initialState,
  reducers: {
    setLocal: (state, action: PayloadAction<scheduleCreateConfig["local"]>) => {
      state.local = action.payload;
    },
    setDate: (state, action: PayloadAction<scheduleCreateConfig["date"]>) => {
      state.date = action.payload;
    },
    setHotelList: (state, action: PayloadAction<scheduleCreateConfig["hotel"]>) => {
      state.hotel = action.payload;
    },
    setPlaceList: (state, action: PayloadAction<scheduleCreateConfig["place"]>) => {
      state.place = action.payload;
    },
    setPlaceTime: (state, action: PayloadAction<{ index: number; time: string }>) => {
      const changedIdx = action.payload.index;
      state.place[changedIdx].time = action.payload.time;
    },
    setPointPlace: (state, action: PayloadAction<scheduleCreateConfig["pointPlace"]>) => {
      state.pointPlace = action.payload;
    },
    setMarker: (state, action: PayloadAction<scheduleCreateConfig["marker"]>) => {
      state.marker = action.payload;
    },
    setListClear: (state) => {
      state.hotel = Array.from({ length: 2 }, () => null);
      state.place = [];
      state.pointPlace = Array.from({ length: 2 }, () => null);
      state.marker = [];
    },
  },
});
export const { setLocal, setDate, setHotelList, setPlaceList, setPlaceTime, setPointPlace, setMarker, setListClear } =
  scheduleCreateSlice.actions;

export const selectLocal = (state: rootState) => state.scheduleCreate.local;
export const selectDate = (state: rootState) => state.scheduleCreate.date;
export const selectHotelList = (state: rootState) => state.scheduleCreate.hotel;
export const selectPlaceList = (state: rootState) => state.scheduleCreate.place;
export const selectPointPlace = (state: rootState) => state.scheduleCreate.pointPlace;
export const selectMarker = (state: rootState) => state.scheduleCreate.marker;

export default scheduleCreateSlice.reducer;
