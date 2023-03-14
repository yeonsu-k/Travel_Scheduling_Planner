import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

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
      sessionStorage.setItem("accessToken", accessToken);
    },
    setLogout: (state) => {
      state.accessToken = "";
      state.login = false;
      state.nickname = "";
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
