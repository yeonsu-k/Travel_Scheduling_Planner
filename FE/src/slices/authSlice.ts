import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface authConfig {
  accessToken: string;
  login: boolean;
  userInfo: userInfoConfig;
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
  },
});

export const { setLogin, setLogout, setUserInfo } = authSlice.actions;
export const selectUserInfo = (state: rootState) => state.auth.userInfo;
export const selectLoginState = (state: rootState) => state.auth.login;

export default authSlice.reducer;
