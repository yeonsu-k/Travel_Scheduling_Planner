import React, { useEffect, useRef } from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";
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
      new NoticeToast().message();
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
