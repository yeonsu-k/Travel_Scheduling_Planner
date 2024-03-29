import React, { useLayoutEffect, useState } from "react";
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
import NoticeToast from "features/user/notice/NoticeToast";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { setNotiNumber } from "slices/mainSlice";
import { selectUserInfo } from "slices/authSlice";
import { connectSocket } from "features/user/notice/Socket";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isNotice, setIsNotice] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const email = useAppSelector(selectUserInfo).email;

  useLayoutEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_SOCKET_URL + email);
    connectSocket(socket);

    socket.onopen = () => {
      console.log("socket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "friend") {
        const message = `${data.senderNickname}님이 ${data.content}을 보냈습니다.`;
        setNoticeMessage(message);
        setIsNotice(true);
      } else if (data.type === "schedule") {
        const message = `${data.senderNickname}님이 ${data.content} 일정을 공유했습니다.`;
        setNoticeMessage(message);
        setIsNotice(true);
      }

      getNotification();
    };

    socket.onclose = (event) => {
      console.log("socket disconnected");
    };

    socket.onerror = (error) => {
      console.log("socket connection error ");
    };
  }, []);

  const getNotification = async () => {
    let notificationCount = 0;
    await Axios.get(api.notification.notification()).then((res) => {
      const noticeList = [...res.data.data.notifications];

      noticeList.map((value) => {
        if (value.status === "NO_RESPONSE") {
          notificationCount++;
        }
      });

      dispatch(setNotiNumber({ notiNumber: notificationCount }));
    });
  };

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
          <Route path="/login" element={<LoginPage setIsNotice={setIsNotice} setNoticeMessage={setNoticeMessage} />} />
          <Route path="/regist" element={<RegistPage />} />

          <Route path="/mypage" element={<AuthRoute component={<Mypage />} />} />
          <Route path="/profile" element={<AuthRoute component={<MyProfileEdit />} />} />
          <Route path="/schedule/*" element={<AuthRoute component={<ScheduleRouter />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <NoticeToast message={noticeMessage} open={isNotice} onClose={setIsNotice} />
      </div>
    </>
  );
}

export default App;
