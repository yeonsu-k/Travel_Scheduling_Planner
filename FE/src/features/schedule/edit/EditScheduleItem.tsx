import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import { height } from "@mui/system";

const EditScheduleItem = () => {
  return (
    <div className={styles.editScheduleItem}>
      <img className={styles.scheduleItemInfo} src="img" />

      <div className={styles.scheduleItemInfo}>
        <Text value="제주공항" type="caption" />
      </div>

      <div className={styles.scheduleItemInfo}>
        <Text value={`10:00`} type="smallText" color="white" en />
        <div style={{ fontSize: "0.2rem", color: "white", height: "1%" }}>¯</div>
        <Text value={`11:00`} type="smallText" color="white" en />
      </div>

      <div className={styles.scheduleItemInfo}>
        <Text value="0시간0분" type="smallText" color="yellow" />
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
