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
