import React from "react";
import { Helmet } from "react-helmet-async";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import MyFriends from "./features/user/myPage/myFriends/MyFriends";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>

      {/* 임시 route. 추후 삭제 예정. */}
      <Route path="/friend" element={<MyFriends />}></Route>
    </Routes>
  );
}

export default App;
