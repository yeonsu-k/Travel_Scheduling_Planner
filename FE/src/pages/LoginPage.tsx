import React, { Dispatch, SetStateAction } from "react";
import Login from "../features/user/login/Login";

export interface LoginProps {
  setIsNotice: Dispatch<SetStateAction<boolean>>;
  setNoticeMessage: Dispatch<SetStateAction<string>>;
}

const LoginPage = ({ setIsNotice, setNoticeMessage }: LoginProps) => {
  return <Login setIsNotice={setIsNotice} setNoticeMessage={setNoticeMessage} />;
};

export default LoginPage;
