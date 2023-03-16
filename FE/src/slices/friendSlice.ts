import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface friendListConfig {
  profile: string;
  email: string;
  nickname: string;
}

interface searchUserConfig {
  email: string;
  exist: boolean;
  nickname: string;
  profile: string;
  status: string;
  success: boolean;
}

interface friendConfig {
  friends: friendListConfig[];
  searchUser: searchUserConfig;
}

const initialState: friendConfig = {
  friends: [],
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
    setFriends: (state, { payload }) => {
      state.friends = payload;
    },
    setSearchUser: (state, { payload }) => {
      state.searchUser = payload;
    },
  },
});

export const { setFriends, setSearchUser } = friendSlice.actions;

export const selectFriends = (state: rootState) => state.friend.friends;
export const selectSearchUser = (state: rootState) => state.friend.searchUser;

export default friendSlice.reducer;
