import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface searchUserConfig {
  email: string;
  exist: boolean;
  nickname: string;
  profile: string;
  status: string;
  success: boolean;
}

interface friendConfig {
  searchUser: searchUserConfig;
}

const initialState: friendConfig = {
  searchUser: {
    email: "",
    exist: false,
    nickname: "",
    profile: "",
    status: "",
    success: false,
  },
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setSearchUser: (state, { payload }) => {
      state.searchUser = payload;
    },
    resetSearchUser: (state) => {
      state.searchUser = {
        email: "",
        exist: false,
        nickname: "",
        profile: "",
        status: "",
        success: false,
      };
    },
  },
});

export const { setSearchUser, resetSearchUser } = friendSlice.actions;

export const selectSearchUser = (state: rootState) => state.friend.searchUser;

export default friendSlice.reducer;
