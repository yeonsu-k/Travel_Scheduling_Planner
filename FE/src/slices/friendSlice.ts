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
  friendCnt: number;
  searchUser: searchUserConfig;
}

const initialState: friendConfig = {
  friendCnt: 0,
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
    setFriendCnt: (state, { payload }) => {
      state.friendCnt = payload;
    },
  },
});

export const { setSearchUser, resetSearchUser, setFriendCnt } = friendSlice.actions;

export const selectSearchUser = (state: rootState) => state.friend.searchUser;
export const selectFriendCnt = (state: rootState) => state.friend.friendCnt;

export default friendSlice.reducer;
