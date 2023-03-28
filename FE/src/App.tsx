import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "components/Header";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import RegistPage from "pages/RegistPage";
import Mypage from "pages/MyPage";
import MyProfileEdit from "features/user/myPage/myProfile/MyProfileEdit";
import ScheduleRouter from "features/schedule/ScheduleRouter";
import NotFound from "pages/NotFound";
import AuthRoute from "./AuthRoute";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div
        style={
          location.pathname.includes("schedule")
            ? {
                height: `calc(100vh - 53px)`,
              }
            : {}
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/regist" element={<RegistPage />} />

          <Route path="/mypage" element={<AuthRoute component={<Mypage />} />} />
          <Route path="/profile" element={<AuthRoute component={<MyProfileEdit />} />} />
          <Route path="/schedule/*" element={<AuthRoute component={<ScheduleRouter />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
