import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface mainConfig {
  destinationList: DestinationConfig[];
  notiNumber: number;
}

export interface DestinationConfig {
  regionId: number;
  regionName: string;
  regionImageURL: string;
  englishName: string;
  contents: string;
}

const initialState: mainConfig = {
  destinationList: [],
  notiNumber: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDestinationList: (state, { payload: { destinationList } }) => {
      state.destinationList = destinationList;
    },
    setNotiNumber: (state, { payload: { notiNumber } }) => {
      state.notiNumber = notiNumber;
      console.log("redux: ", state.notiNumber);
    },
  },
});

export const { setDestinationList, setNotiNumber } = mainSlice.actions;
export const selectDestinationList = (state: rootState) => state.main.destinationList;
export const selectNotiNumber = (state: rootState) => state.main.notiNumber;

export default mainSlice.reducer;
