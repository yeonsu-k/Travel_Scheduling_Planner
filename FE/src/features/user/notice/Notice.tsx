import React, { useEffect, useRef } from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { resetNoticeList, selectNoticeList, setNoticeList } from "slices/noticeSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { selectUserInfo } from "slices/authSlice";

const Notice = () => {
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectUserInfo).email;
  const noticeList = useAppSelector(selectNoticeList);

  const fireNotification = (title: string, options: any) => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        } else {
          return;
        }
      });
    } else {
      new Notification(title, options);
    }
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

      console.log("data: ", event);

      if (event.data.type === "friend") {
        fireNotification("MYRO", {
          body: `${event.data.senderNickname}님이 ${event.data.content}을 보냈습니다.`,
        });
      } else if (event.data.type === "schedule") {
        fireNotification("MYRO", {
          body: `${event.data.senderNickname}님이 일정공유 요청을 보냈습니다.`,
        });
      } else {
        fireNotification("MYRO", {
          body: event.data,
        });
      }
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

  const onClickClearBtn = () => {
    Axios.delete(api.notification.notification())
      .then((res) => {
        console.log(res);
        dispatch(resetNoticeList());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Axios.get(api.notification.notification())
      .then((res) => {
        console.log(res);
        dispatch(setNoticeList([...res.data.data.notifications]));
      })
      .catch((err) => {
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
