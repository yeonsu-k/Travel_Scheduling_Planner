import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface friendListConfig {
  profile: string;
  email: string;
  nickname: string;
}

interface friendConfig {
  friends: friendListConfig[];
}

const initialState: friendConfig = {
  friends: [],
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, { payload }) => {
      state.friends = payload;
    },
  },
});

export const { setFriends } = friendSlice.actions;

export const selectFriends = (state: rootState) => state.friend.friends;

export default friendSlice.reducer;
