import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

interface mapConfig {
  local: string;
  date: {
    start: string;
    end: string;
  };
  hotel: ({ id: number; image: string; name: string } | null)[];
  place: {
    id: number;
    image: string;
    name: string;
    time: string;
  }[];
  pointPlace: {
    start: { id: number; image: string; name: string } | null;
    end: { id: number; image: string; name: string } | null;
  };
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
  place: {
    id: number;
    image: string;
    name: string;
    time: string;
  }[];
}

interface placePointConfig {
  id: number;
  image: string;
  name: string;
}

const initialState: mapConfig = {
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
    setPlaceTime: (
      state,
      action: PayloadAction<{
        index: number;
        time: string;
      }>,
    ) => {
      const changedIdx = action.payload.index;
      state.place[changedIdx].time = action.payload.time;
    },
    deletePointPlaceList: (state, action: PayloadAction<{ position: number; value: placePointConfig | null }>) => {
      const changedPosition = action.payload.position;
      if (changedPosition === 0) {
        state.pointPlace.start = action.payload.value;
      } else {
        state.pointPlace.end = action.payload.value;
      }
    },
  },
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;
