import React, { useEffect } from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import EditDayMoveItem from "./EditDayMoveItem";
import { useAppSelector } from "app/hooks";
import { selectScheduleList } from "slices/scheduleEditSlice";

interface EditDayMoveListProps {
  day: number;
}

const EditDayMoveList = ({ day }: EditDayMoveListProps) => {
  const dayList = useAppSelector(selectScheduleList)[day - 1];

  useEffect(() => {
    console.log("dayList", dayList);
  }, []);

  return (
    <div className={styles.editDayMoveList}>
      <Text value={`DAY ${day}`} bold en />

      <div style={{ margin: "1vh" }}></div>
      {Array.from({ length: dayList.length - 1 }, (value, key) => (
        <EditDayMoveItem key={key} day={day} step={key} />
      ))}
    </div>
  );
};

export default EditDayMoveList;
