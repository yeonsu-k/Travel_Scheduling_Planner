import React, { Dispatch, SetStateAction } from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import Text from "components/Text";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { noticeListProps } from "./Notice";
import { setNotiNumber } from "slices/mainSlice";
import { useAppDispatch } from "app/hooks";

interface NoticeItemProps {
  noticeValue: noticeListProps;
  setChange: Dispatch<SetStateAction<boolean>>;
}

const noticeList: noticeListProps[] = [];

const NoticeItem = ({ noticeValue, setChange }: NoticeItemProps) => {
  const dispatch = useAppDispatch();

  const onClickHandlingNotification = async (isAccept: boolean) => {
    await Axios.post(api.notification.notification(), {
      notificationId: noticeValue.notificationId,
      isAccept: isAccept,
      type: noticeValue.type,
    })
      .then((res) => {
        console.log(res);
        setChange(true);
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
        window.location.reload();
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
        const list = [...res.data.data.notifications];
        console.log("list", noticeList);

        noticeList.map((value, key) => {
          if (value.status === "NO_RESPONSE") {
            notificationCount++;
            noticeList.push(value);
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
