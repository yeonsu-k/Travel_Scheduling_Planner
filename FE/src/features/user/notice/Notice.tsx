import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppSelector } from "app/hooks";
import { selectNoticeList } from "slices/noticeSlice";

const Notice = () => {
  const noticeList = useAppSelector(selectNoticeList);

  return (
    <div className={styles.notice}>
      <div className={styles.clearBtn}>
        <Button text="전체 삭제" color="main" radius width="8vw" height="4vh" />
      </div>

      {noticeList.map((value, key) => (
        <NoticeItem key={key} noticeValue={value} />
      ))}
    </div>
  );
};

export default Notice;
