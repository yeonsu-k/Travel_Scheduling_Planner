import React from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";
import MyScheduleList from "./MyScheduleList";

const MySchedule = () => {
  return (
    <div className={styles.mySchedule}>
      <div className={styles.myScheduleTitle}>
        <Text value="나의 일정" type="textTitle" bold />
      </div>
      <MyScheduleList />
    </div>
  );
};

export default MySchedule;
