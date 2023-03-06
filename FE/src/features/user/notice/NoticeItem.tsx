import React from "react";
import styles from "./Notice.module.css";
import Button from "components/Button";
import Text from "components/Text";
import { noticeListConfig, selectNoticeList, setNoticeList } from "slices/noticeSlice";
import sampleImg from "asset/sample/cat.png";
import { useAppDispatch, useAppSelector } from "app/hooks";

interface NoticeItemProps {
  key: number;
  noticeValue: noticeListConfig;
}

const NoticeItem = ({ key, noticeValue }: NoticeItemProps) => {
  const dispatch = useAppDispatch();

  const noticeList = useAppSelector(selectNoticeList);

  const onClickDeleteBtn = () => {
    const tmp = [...noticeList];
    tmp.splice(key, 1);

    dispatch(setNoticeList([...tmp]));
  };

  if (noticeValue.noticeType === "schedule") {
    return (
      <div className={styles.noticeItem}>
        <div className={styles.noticeInfo}>
          <img className={styles.noticeImg} src={sampleImg} />
        </div>

        <div className={styles.noticeInfo}>
          <Text value={`'${noticeValue.noticeProfile}'`} type="caption" bold />
          <Text value="님이 " type="caption" />
          <Text value={`'${noticeValue.noticeContent}'`} type="caption" bold />
          <Text value=" 일정을 공유했습니다." type="caption" />
        </div>

        <div className={styles.noticeInfo}>
          <Button text="수락" color="main" radius width="7vw" height="3vh" />
        </div>
        <div className={styles.noticeInfo}>
          <Button text="거절" color="gray" radius width="7vw" height="3vh" />
        </div>

        <div className={styles.noticeInfo} onClick={onClickDeleteBtn}>
          <Text value="X" type="groupTitle" color="lightgray" />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.noticeItem}>
        <div className={styles.noticeInfo}>
          <img className={styles.noticeImg} src={sampleImg} />
        </div>

        <div className={styles.noticeInfo}>
          <Text value={`'${noticeValue.noticeProfile}'`} type="caption" bold />
          <Text value="님이 " type="caption" />
          <Text value={`'${noticeValue.noticeContent}'`} type="caption" bold />
          <Text value="을 보냈습니다." type="caption" />
        </div>

        <div className={styles.noticeInfo}>
          <Button text="수락" color="main" radius width="7vw" height="3vh" />
        </div>
        <div className={styles.noticeInfo}>
          <Button text="거절" color="gray" radius width="7vw" height="3vh" />
        </div>

        <div className={styles.noticeInfo} onClick={onClickDeleteBtn}>
          <Text value="X" type="groupTitle" color="lightgray" />
        </div>
      </div>
    );
  }
};

export default NoticeItem;
