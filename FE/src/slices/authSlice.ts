import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface authConfig {
  accessToken: string;
  login: boolean;
  userInfo: userInfoConfig;
  token: boolean;
}

interface userInfoConfig {
  email: string;
  nickname: "";
}

const initialState: authConfig = {
  accessToken: "",
  login: false,
  userInfo: {
    email: "",
    nickname: "",
  },
  token: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload: { accessToken, nickname } }) => {
      state.accessToken = accessToken;
      state.login = true;
      state.userInfo.nickname = nickname;
      sessionStorage.setItem("accessToken", accessToken);
    },
    setLogout: (state) => {
      state.accessToken = "";
      state.login = false;
      state.userInfo.nickname = "";
      sessionStorage.clear();
      localStorage.clear();
    },
    setUserInfo: (state, { payload: { email } }) => {
      state.userInfo.email = email;
    },
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setLogin, setLogout, setUserInfo, setToken } = authSlice.actions;
export const selectUserInfo = (state: rootState) => state.auth.userInfo;
export const selectToken = (state: rootState) => state.auth.token;
export default authSlice.reducer;
