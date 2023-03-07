import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "components/Header";
import MainPage from "pages/MainPage";
import Mypage from "pages/MyPage";
import ScheduleRouter from "features/schedule/ScheduleRouter";
import LoginPage from "pages/LoginPage";
import RegistPage from "pages/RegistPage";
import MyProfileEdit from "features/user/myPage/myProfile/MyProfileEdit";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div
        style={
          location.pathname === "/mypage"
            ? { paddingTop: "53px" }
            : location.pathname === "/schedule/create" || location.pathname === "/schedule/edit"
            ? {
                height: `calc(100vh - 53px)`,
              }
            : {}
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/schedule/*" element={<ScheduleRouter />} />
          <Route path="/profile" element={<MyProfileEdit />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regist" element={<RegistPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
