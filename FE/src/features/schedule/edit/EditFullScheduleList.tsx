import React from "react";
import styles from "./Edit.module.css";
import { selectFullScheduleList } from "slices/scheduleEditSlice";
import { selectPlaceList } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import Text from "components/Text";
import EditDayScheduleList from "./EditDayScheduleList";

const EditFullScheduleList = () => {
  const place = useAppSelector(selectPlaceList);

  const fullScheduleList = useAppSelector(selectFullScheduleList);

  return (
    <div className={styles.editFullScheduleList}>
      <div>
        <Text value={`${place} : `} type="text" bold />
        <Text value={`${fullScheduleList.length}`} type="text" color="day_1" bold />
        <Text value="일 여행" type="text" bold />
      </div>

      {fullScheduleList.map((value, key) => (
        <div key={key} style={{ width: "90%" }}>
          <EditDayScheduleList day={value.day} />
        </div>
      ))}
    </div>
  );
};

export default EditFullScheduleList;
