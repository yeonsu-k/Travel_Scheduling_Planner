import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

interface mapConfig {
  local: string;
  date: {
    start: string;
    end: string;
  };
  hotel: ({ id: number; image: string; name: string } | null)[];
  place: ({
    id: number;
    image: string;
    name: string;
    time: string;
  } | null)[];
}

interface LocalConfig {
  local: string;
}

interface dateConfig {
  date: {
    start: string;
    end: string;
  };
}

interface hotelConfig {
  hotel: ({ id: number; image: string; name: string } | null)[];
}

interface placeConfig {
  place: ({
    id: number;
    image: string;
    name: string;
    time: string;
  } | null)[];
}

const initialState: mapConfig = {
  local: "부산",
  date: {
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  },
  hotel: [],
  place: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setLocal: (state, action: PayloadAction<LocalConfig>) => {
      state.local = action.payload.local;
    },
    setDate: (state, action: PayloadAction<dateConfig>) => {
      state.date = action.payload.date;
    },
    setHotelList: (state, action: PayloadAction<hotelConfig>) => {
      state.hotel = action.payload.hotel;
    },
    setPlaceList: (state, action: PayloadAction<placeConfig>) => {
      state.place = action.payload.place;
    },
  },
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;
