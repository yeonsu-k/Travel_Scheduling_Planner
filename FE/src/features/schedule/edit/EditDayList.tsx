import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import EditDayItem from "./EditDayItem";
import { useAppSelector } from "app/hooks";
import { selectFullScheduleList } from "slices/scheduleEditSlice";

const EditDayList = () => {
  const scheduleList = useAppSelector(selectFullScheduleList);

  return (
    <div className={styles.editDayList}>
      <Text value="일정" type="text" />

      <div className={styles.fullScheduleItem}>
        <EditDayItem />
      </div>

      {scheduleList.map((value, key) => (
        <EditDayItem day={value.day} key={key} />
      ))}
    </div>
  );
};

export default EditDayList;
