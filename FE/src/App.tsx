import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "components/Header";
import MainPage from "pages/MainPage";
import MapPage from "pages/MapPage";
import Mypage from "pages/MyPage";
import MyFriends from "features/user/myPage/myFriends/MyFriends";

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <div
        style={
          location.pathname === "/mypage"
            ? { paddingTop: "53px" }
            : location.pathname === "/map"
            ? {
                height: `calc(100vh - 53px)`,
              }
            : {}
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/mypage" element={<Mypage />} />
          {/* 임시 route. 추후 삭제 예정. */}
          <Route path="/friend" element={<MyFriends />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
