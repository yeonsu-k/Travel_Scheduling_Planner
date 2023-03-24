import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";

interface EditScheduleItemProps {
  img: string;
  placeName: string;
  time: string;
  // startTime: string;
  // endTime: string;
}

const EditScheduleItem = ({ img, placeName, time }: EditScheduleItemProps) => {
  return (
    <div className={styles.editScheduleItem}>
      <img className={styles.scheduleItemInfo} src={img} />

      <div className={styles.scheduleItemInfo}>
        <Text value={placeName} type="caption" />
      </div>

      <div className={styles.scheduleItemInfo}>
        <Text value="00:00" type="smallText" color="white" en />
        <div style={{ fontSize: "0.2rem", color: "white", height: "1%" }}>¯</div>
        <Text value="00:00" type="smallText" color="white" en />
      </div>

      <div className={styles.scheduleItemInfo}>
        <Text value={time} type="smallText" color="yellow" />
      </div>

      <div className={styles.scheduleItemInfo}>
        <Text value="시간표" type="smallText" />
      </div>
      <div className={styles.scheduleItemInfo}>
        <Text value="구매" type="smallText" />
      </div>
      <div className={styles.scheduleItemInfo}>
        <Text value="메모" type="smallText" />
      </div>
      <div className={styles.scheduleItemInfo}>
        <Text value="삭제" type="smallText" />
      </div>
    </div>
  );
};

export default EditScheduleItem;
