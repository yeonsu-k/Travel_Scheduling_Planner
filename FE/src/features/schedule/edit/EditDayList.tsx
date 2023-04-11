import React, { Dispatch, SetStateAction } from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import EditDayItem from "./EditDayItem";
import { useAppSelector } from "app/hooks";
import { selectScheduleList } from "slices/scheduleEditSlice";

interface EditDayListProps {
  setDay: Dispatch<SetStateAction<number>>;
  setViewDaySchedule: Dispatch<SetStateAction<boolean>>;
}

const EditDayList = ({ setDay, setViewDaySchedule }: EditDayListProps) => {
  const scheduleList = useAppSelector(selectScheduleList);

  return (
    <div className={styles.editDayList}>
      <Text value="일정" type="text" />

      <div className={styles.fullScheduleItem}>
        <EditDayItem setViewDaySchedule={setViewDaySchedule} />
      </div>

      {scheduleList.map((value, key) => (
        <EditDayItem day={key + 1} key={key} setDay={setDay} setViewDaySchedule={setViewDaySchedule} />
      ))}
    </div>
  );
};

export default EditDayList;
