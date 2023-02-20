import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mapConfig {
  place: string;
}

const initialState: mapConfig = {
  place: "부산",
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<mapConfig>) => {
      state.place = action.payload.place;
    },
  },
});

export const mapActions = mapSlice.actions;

export default mapSlice.reducer;
