import React from "react";
import { createSlice } from "@reduxjs/toolkit";

interface authConfig {
  accessToken: string;
  login: boolean;
  nickname: string;
}

const initialState: authConfig = {
  accessToken: "",
  login: false,
  nickname: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload: { accessToken, nickname } }) => {
      state.accessToken = accessToken;
      state.login = true;
      state.nickname = nickname;
    },
  },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
