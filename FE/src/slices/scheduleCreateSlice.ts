import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootState } from "app/store";
import { addDays, format } from "date-fns";

export interface basicConfig {
  locationId: number;
  locationName: string;
  locationURL: string;
  address: string;
  latitude: number;
  longitude: number;
  time: string;
}

interface scheduleCreateConfig {
  region: {
    id: number;
    name: string;
    engName: string;
  };
  date: {
    start: string;
    end: string;
  };
  vehicle: string;
  hotel: (basicConfig | null)[];
  place: basicConfig[];
  pointPlace: (basicConfig | null)[];
  marker: {
    info: basicConfig;
    type: string;
  }[];
  total: {
    info: basicConfig;
    time: string;
  }[];
}

const initialState: scheduleCreateConfig = {
  region: {
    id: 1,
    name: "서울",
    engName: "SEOUL",
  },
  date: {
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  },
  vehicle: "car",
  hotel: Array.from({ length: 2 }, () => null),
  place: [],
  pointPlace: Array.from({ length: 2 }, () => null),
  marker: [],
  total: [],
};

const scheduleCreateSlice = createSlice({
  name: "scheduleCreate",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<scheduleCreateConfig["region"]>) => {
      state.region = action.payload;
    },
    setDate: (state, action: PayloadAction<scheduleCreateConfig["date"]>) => {
      state.date = action.payload;
    },
    setVehicle: (state, action: PayloadAction<scheduleCreateConfig["vehicle"]>) => {
      state.vehicle = action.payload;
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
    setTotalList: (state) => {
      const { hotel, place, pointPlace } = state;
      let temp = hotel.filter((ele) => ele !== null) as basicConfig[];
      const newHotel = temp.map((val) => {
        return {
          info: val,
          time: "00:00",
        };
      });
      temp = pointPlace.filter((ele) => ele != null) as basicConfig[];
      const newPointPlace = temp.map((val) => {
        return {
          info: val,
          time: "00:00",
        };
      });
      const newPlace = place.map((val) => {
        return {
          info: val,
          time: val.time,
        };
      });

      state.total = [...newHotel, ...newPointPlace, ...newPlace];
    },
  },
});
export const {
  setRegion,
  setDate,
  setVehicle,
  setHotelList,
  setPlaceList,
  setPlaceTime,
  setPointPlace,
  setMarker,
  setListClear,
  setTotalList,
} = scheduleCreateSlice.actions;

export const selectRegion = (state: rootState) => state.scheduleCreate.region;
export const selectDate = (state: rootState) => state.scheduleCreate.date;
export const selectVehicle = (state: rootState) => state.scheduleCreate.vehicle;
export const selectHotelList = (state: rootState) => state.scheduleCreate.hotel;
export const selectPlaceList = (state: rootState) => state.scheduleCreate.place;
export const selectPointPlace = (state: rootState) => state.scheduleCreate.pointPlace;
export const selectMarker = (state: rootState) => state.scheduleCreate.marker;
export const selectTotalList = (state: rootState) => state.scheduleCreate.total;

export default scheduleCreateSlice.reducer;
