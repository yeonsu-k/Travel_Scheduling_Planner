import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "app/store";

interface authConfig {
  accessToken: string;
  login: boolean;
  userInfo: userInfoConfig;
}

interface userInfoConfig {
  email: string;
  nickname: "";
}

export let socket: WebSocket;

const initialState: authConfig = {
  accessToken: "",
  login: false,
  userInfo: {
    email: "",
    nickname: "",
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
      state.userInfo.nickname = "";
      sessionStorage.clear();
      localStorage.clear();
      console.log("login", state.login);
      socket.close();
    },
    setUserInfo: (state, { payload: { email } }) => {
      state.userInfo.email = email;
      const webSocketUrl = process.env.REACT_APP_SOCKET_URL + state.userInfo.email;
      socket = new WebSocket(webSocketUrl);
    },
  },
});

export const { setLogin, setLogout, setUserInfo } = authSlice.actions;
export const selectUserInfo = (state: rootState) => state.auth.userInfo;
export const selectLoginState = (state: rootState) => state.auth.login;

export default authSlice.reducer;
