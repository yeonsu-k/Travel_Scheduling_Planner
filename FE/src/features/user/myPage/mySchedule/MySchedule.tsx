import React from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";

const MySchedule = () => {
  return (
    <div className={styles.mySchedule}>
      <Text value="나의 일정" type="textTitle" bold en />
    </div>
  );
};

export default MySchedule;
