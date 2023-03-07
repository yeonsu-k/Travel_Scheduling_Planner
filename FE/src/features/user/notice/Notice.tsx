import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import NoticeItem from "./NoticeItem";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { resetNoticeList, selectNoticeList } from "slices/noticeSlice";

const Notice = () => {
  const dispatch = useAppDispatch();

  const noticeList = useAppSelector(selectNoticeList);

  const onClickClearBtn = () => {
    dispatch(resetNoticeList());
  };

  return (
    <div className={styles.notice}>
      {noticeList.length === 0 ? (
        <div>알림 내역이 없습니다.</div>
      ) : (
        <>
          <div className={styles.clearBtn}>
            <Button text="전체 삭제" color="main" radius width="8vw" height="4vh" onClick={onClickClearBtn} />
          </div>

          {noticeList.map((value, key) => (
            <NoticeItem key={key} noticeValue={value} />
          ))}
        </>
      )}
    </div>
  );
};

export default Notice;
