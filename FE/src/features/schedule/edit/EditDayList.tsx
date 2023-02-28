import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import EditDayItem from "./EditDayItem";

const EditDayList = () => {
  return (
    <div className={styles.editDayList}>
      <Text value="일정" type="text" />

      <div className={styles.fullScheduleItem}>
        <EditDayItem />
      </div>

      <EditDayItem day="1" />
      <EditDayItem day="2" />
      <EditDayItem day="3" />
    </div>
  );
};

export default EditDayList;
