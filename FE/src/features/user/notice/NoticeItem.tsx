import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import Text from "components/Text";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { noticeListProps } from "./Notice";
import { getFriendInfo } from "pages/MyPage";
import { setNotiNumber } from "slices/mainSlice";
import { useAppDispatch } from "app/hooks";

interface NoticeItemProps {
  noticeValue: noticeListProps;
}

let noticeList: noticeListProps[] = [];

const NoticeItem = ({ noticeValue }: NoticeItemProps) => {
  const dispatch = useAppDispatch();

  const onClickHandlingNotification = async (isAccept: boolean) => {
    await Axios.post(api.notification.notification(), {
      notificationId: noticeValue.notificationId,
      isAccept: isAccept,
      type: noticeValue.type,
    })
      .then((res) => {
        console.log(res);
        alert("알림 처리 완료");
        getNotification();
        getFriendInfo();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickDeleteBtn = async () => {
    await Axios.delete(api.notification.deleteOneNotification(noticeValue.notificationId))
      .then((res) => {
        console.log(res);
        getNotification();
      })
      .catch((err) => {
        console.log(err);
      });
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

  return (
    <div className={styles.noticeItem}>
      <div className={styles.noticeInfo}>
        <Text value={`'${noticeValue.senderNickname}'`} type="caption" bold />
        <Text value="님이 " type="caption" />
        <Text value={`'${noticeValue.content}'`} type="caption" bold />
        {noticeValue.type === "schedule" ? (
          <Text value=" 일정을 공유했습니다." type="caption" />
        ) : (
          <Text value="을 보냈습니다." type="caption" />
        )}
      </div>

      {noticeValue.status === "NO_RESPONSE" ? (
        <>
          <div className={`${styles.noticeInfo} ${styles.borderButton}`}>
            <Button
              text="수락"
              color="white"
              radius
              width="8.7vw"
              height="3.2vh"
              onClick={() => onClickHandlingNotification(true)}
            />
          </div>
          <div className={`${styles.noticeInfo} ${styles.borderButton}`}>
            <Button
              text="거절"
              color="white"
              radius
              width="8.7vw"
              height="3.2vh"
              onClick={() => onClickHandlingNotification(false)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.noticeInfo}>
            {noticeValue.status === "ACCEPT" ? (
              <Button text="수락됨" color="gray" radius width="8.7vw" height="3.5vh" disabled />
            ) : (
              <Button text="거절됨" color="gray" radius width="8.7vw" height="3.5vh" disabled />
            )}
          </div>
          <div className={styles.noticeInfo}>
            <Button text="삭제" color="pink" radius width="8.7vw" height="3.5vh" onClick={onClickDeleteBtn} />
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeItem;
