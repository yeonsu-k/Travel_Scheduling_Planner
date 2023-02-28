import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";

interface EditDayItemProps {
  day: string;
}

const EditDayItem = ({ day }: EditDayItemProps) => {
  return (
    <div className={styles.editDayItem}>
      {day === "전체일정" ? <Text value={day} type="smallText" en /> : <Text value={`DAY${day}`} type="smallText" en />}
    </div>
  );
};

EditDayItem.defaultProps = {
  day: "전체일정",
};

export default EditDayItem;
