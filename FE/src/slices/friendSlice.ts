import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

export interface friendProps {
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
  friendCnt: number;
  friendList: friendProps[];
  searchUser: searchUserConfig;
}

const initialState: friendConfig = {
  friendCnt: 0,
  friendList: [],
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
    setFriendCnt: (state, { payload }) => {
      state.friendCnt = payload;
    },
    setFriendList: (state, { payload }) => {
      state.friendList = payload;
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

export const { setFriendCnt, setFriendList, setSearchUser, resetSearchUser } = friendSlice.actions;

export const selectFriendCnt = (state: rootState) => state.friend.friendCnt;
export const selectFriendList = (state: rootState) => state.friend.friendList;
export const selectSearchUser = (state: rootState) => state.friend.searchUser;

export default friendSlice.reducer;
