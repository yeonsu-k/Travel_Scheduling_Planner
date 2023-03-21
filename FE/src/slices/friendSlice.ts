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
  friendNumber: number;
  friends: friendListConfig[];
  searchUser: searchUserConfig;
}

const initialState: friendConfig = {
  friendNumber: 0,
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
    setFriendNumber: (state, { payload }) => {
      state.friendNumber = payload;
    },
    setFriends: (state, { payload }) => {
      state.friends = payload;
    },
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

export const { setFriendNumber, setFriends, setSearchUser, resetSearchUser } = friendSlice.actions;

export const selectFriendNumber = (state: rootState) => state.friend.friendNumber;
export const selectFriends = (state: rootState) => state.friend.friends;
export const selectSearchUser = (state: rootState) => state.friend.searchUser;

export default friendSlice.reducer;
