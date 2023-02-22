import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

interface mapConfig {
  place: string;
  date: {
    start: string;
    end: string;
  };
}

interface placeConfig {
  place: string;
}

interface dateConfig {
  date: {
    start: string;
    end: string;
  };
}

const initialState: mapConfig = {
  place: "부산",
  date: {
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<placeConfig>) => {
      state.place = action.payload.place;
    },
    setDate: (state, action: PayloadAction<dateConfig>) => {
      state.date = action.payload.date;
    },
  },
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;
