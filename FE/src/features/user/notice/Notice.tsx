import React, { useEffect } from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { resetNoticeList, selectNoticeList, setNoticeList } from "slices/noticeSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";
import SockJS from "sockjs-client";
import StompJs from "@stomp/stompjs";

const Notice = () => {
  const dispatch = useAppDispatch();

  const accessToken = sessionStorage.getItem("accessToken");
  const noticeList = useAppSelector(selectNoticeList);

  if (accessToken) {
    const webSocket = new WebSocket("ws://127.0.0.1:8080/ws-stomp");

    webSocket.onopen = () => {
      console.log("연결 성공");
    };
    webSocket.onerror = () => {
      console.log("err");
    };
  }

  // const client = new StompJs.Client({
  //   brokerURL: "ws://localhost:8080/ws-stomp",
  //   connectHeaders: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  const onClickClearBtn = () => {
    Axios.delete(api.notification.notification())
      .then((res: any) => {
        console.log(res);
        dispatch(resetNoticeList());
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    Axios.get(api.notification.notification())
      .then((res: any) => {
        console.log(res);
        dispatch(setNoticeList([...res.data.data.notifications]));
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.notice}>
      {noticeList.length === 0 ? (
        <div>알림 내역이 없습니다.</div>
      ) : (
        <>
          <div className={styles.clearBtn}>
            <Button text="전체 삭제" color="main" radius width="8vw" height="4vh" onClick={onClickClearBtn} />
          </div>

          <hr style={{ backgroundColor: "#c5c5c5", height: "1px", border: "0", width: "100%" }} />

          {noticeList.map((value, key) => (
            <NoticeItem key={key} index={key} noticeValue={value} />
          ))}
        </>
      )}
    </div>
  );
};

export default Notice;
