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
  nickname: string;
  profile: string;
}

const initialState: authConfig = {
  accessToken: "",
  login: false,
  userInfo: {
    email: "",
    nickname: "",
    profile: "",
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
      state.userInfo.email = "";
      state.userInfo.nickname = "";
      state.userInfo.profile = "";
      sessionStorage.clear();
      console.log("login", state.login);
    },
    setUserInfo: (state, { payload: { email, profile } }) => {
      state.userInfo.email = email;
      state.userInfo.profile = profile;
    },
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setLogin, setLogout, setUserInfo, setToken } = authSlice.actions;
export const selectUserInfo = (state: rootState) => state.auth.userInfo;
export const selectLoginState = (state: rootState) => state.auth.login;

export const selectToken = (state: rootState) => state.auth.token;
export default authSlice.reducer;
