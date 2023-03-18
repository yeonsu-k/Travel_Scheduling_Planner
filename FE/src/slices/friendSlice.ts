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
  friends: [
    {
      profile: "",
      email: "jyeon3930@naver.com",
      nickname: "kjyeon",
    },
    {
      profile: "",
      email: "test@test.com",
      nickname: "test",
    },
  ],
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

export const { setFriends, setSearchUser, resetSearchUser } = friendSlice.actions;

export const selectFriends = (state: rootState) => state.friend.friends;
export const selectSearchUser = (state: rootState) => state.friend.searchUser;

export default friendSlice.reducer;
