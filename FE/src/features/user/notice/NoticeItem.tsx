import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import Text from "components/Text";
import { noticeListConfig, selectNoticeList, setNoticeList } from "slices/noticeSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

interface NoticeItemProps {
  index: number;
  noticeValue: noticeListConfig;
}

const NoticeItem = ({ index, noticeValue }: NoticeItemProps) => {
  const dispatch = useAppDispatch();

  const noticeList = useAppSelector(selectNoticeList);

  const onClickDeleteBtn = () => {
    const tmp = [...noticeList];
    console.log(index);
    tmp.splice(index, 1);

    dispatch(setNoticeList([...tmp]));
  };

  return (
    <div className={styles.noticeItem}>
      <div className={styles.noticeInfo}>
        <Text value={`'${noticeValue.noticeProfile}'`} type="caption" bold />
        <Text value="님이 " type="caption" />
        <Text value={`'${noticeValue.noticeContent}'`} type="caption" bold />
        {noticeValue.noticeType === "schedule" ? (
          <Text value=" 일정을 공유했습니다." type="caption" />
        ) : (
          <Text value="을 보냈습니다." type="caption" />
        )}
      </div>

      {noticeValue.noticeStatus === "NO_RESPONSE" ? (
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
            {noticeValue.noticeStatus === "ACCEPT" ? (
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
