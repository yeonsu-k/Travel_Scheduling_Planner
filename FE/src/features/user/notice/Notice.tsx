import React, { useEffect, useRef } from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { selectUserInfo } from "slices/authSlice";

import { selectNotiNumber, setNotiNumber } from "slices/mainSlice";

export interface noticeListProps {
  notificationId: number;
  senderNickname: string;
  type: string;
  content: string;
  status: string;
}

let noticeList: noticeListProps[] = [];

const Notice = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectUserInfo).email;
  const notiNumber = useAppSelector(selectNotiNumber);

  const requestNotification = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          return;
        }
      });
    }
  };

  const fireNotification = (title: string, options: object) => {
    new Notification(title, options);
  };

  const webSocketUrl = process.env.REACT_APP_SOCKET_URL + email;

  const ws = useRef<WebSocket | null>(null);
  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
    };
    ws.current.onmessage = (event) => {
      console.log("메세지 옴: " + event.data);

      const data = JSON.parse(event.data);

      console.log("data: ", data.type);

      if (data.type === "friend") {
        console.log("friend");
        fireNotification("MYRO", {
          body: `${data.senderNickname}님이 ${data.content}을 보냈습니다.`,
        });
      } else if (data.type === "schedule") {
        fireNotification("MYRO", {
          body: `${data.senderNickname}님이 ${data.content} 일정을 공유했습니다.`,
        });
      }

      getNotification();
    };
    ws.current.onclose = (event) => {
      console.log("disconnect from " + webSocketUrl);
      console.log(event);
    };
    ws.current.onerror = (error) => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
  }

  const getNotification = async () => {
    let notificationCount = 0;

    await Axios.get(api.notification.notification())
      .then((res) => {
        console.log(res);
        noticeList = [...res.data.data.notifications];
        console.log("list", noticeList);

        noticeList.map((value, key) => {
          if (value.status === "NO_RESPONSE") {
            notificationCount++;
          }
        });

        console.log("cnt: ", notificationCount);
        dispatch(setNotiNumber({ notiNumber: notificationCount }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickClearBtn = async () => {
    await Axios.delete(api.notification.notification())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    getNotification();
  };

  useEffect(() => {
    getNotification();
    requestNotification();
  }, []);

  useEffect(() => {
    getNotification();
  }, [notiNumber]);

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
            <NoticeItem key={key} noticeValue={value} />
          ))}
        </>
      )}
    </div>
  );
};

export default Notice;
