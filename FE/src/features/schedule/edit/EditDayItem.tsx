import React, { Dispatch, SetStateAction, useRef } from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import colorPalette from "styles/colorPalette";

interface EditDayItemProps {
  day: any;
  setDay: Dispatch<SetStateAction<number>>;
  setViewDaySchedule: Dispatch<SetStateAction<boolean>>;
}

const EditDayItem = ({ day, setDay, setViewDaySchedule }: EditDayItemProps) => {
  const dayItem = useRef<HTMLDivElement>(null);

  const onClickDaySchedule = () => {
    if (day !== "전체일정") {
      setDay(day);
      setViewDaySchedule(true);
    } else {
      setViewDaySchedule(false);
    }
  };

  return (
    <div className={styles.editDayItem} onClick={onClickDaySchedule} ref={dayItem}>
      {day === "전체일정" ? <Text value={day} type="smallText" en /> : <Text value={`DAY${day}`} type="smallText" en />}
    </div>
  );
};

EditDayItem.defaultProps = {
  day: "전체일정",
  setDay: "",
};

export default EditDayItem;
