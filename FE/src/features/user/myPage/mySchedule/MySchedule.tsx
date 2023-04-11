import React from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";
import MyScheduleList from "./MyScheduleList";

const MySchedule = () => {
  return (
    <div className={styles.mySchedule}>
      <MyScheduleList />
    </div>
  );
};

export default MySchedule;
