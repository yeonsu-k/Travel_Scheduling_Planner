import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import Text from "components/Text";
import { noticeListConfig, selectNoticeList, setNoticeList } from "slices/noticeSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";

interface NoticeItemProps {
  index: number;
  noticeValue: noticeListConfig;
}

const NoticeItem = ({ index, noticeValue }: NoticeItemProps) => {
  const dispatch = useAppDispatch();

  const noticeList = useAppSelector(selectNoticeList);

  const onClickDeleteBtn = () => {
    Axios.delete(api.notification.deleteOneNotification(noticeValue.notificationId))
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });

    const tmp = [...noticeList];
    console.log(index);
    tmp.splice(index, 1);

    dispatch(setNoticeList([...tmp]));
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
            <Button text="수락" color="white" radius width="8.7vw" height="3.2vh" />
          </div>
          <div className={`${styles.noticeInfo} ${styles.borderButton}`}>
            <Button text="거절" color="white" radius width="8.7vw" height="3.2vh" />
          </div>
        </>
      ) : (
        <>
          <div className={styles.noticeInfo}>
            {noticeValue.status === "ACCEPT" ? (
              <Button text="수락됨" color="gray" radius width="8.7vw" height="3.5vh" />
            ) : (
              <Button text="거절됨" color="gray" radius width="8.7vw" height="3.5vh" />
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
