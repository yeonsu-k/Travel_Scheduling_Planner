import React, { useEffect } from "react";
import styles from "../Edit.module.css";
import { selectScheduleList } from "slices/scheduleEditSlice";
import { selectDate, selectRegion } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import Text from "components/Text";
import EditDayScheduleList from "./EditDayScheduleList";
import { add } from "date-fns";

const EditFullScheduleList = () => {
  const region = useAppSelector(selectRegion).name;

  const scheduleList = useAppSelector(selectScheduleList);
  const date = new Date(useAppSelector(selectDate).start);

  return (
    <div className={styles.editFullScheduleList}>
      <div>
        <Text value={`${region} : `} type="text" bold />
        <Text value={`${scheduleList.length}`} type="text" color="day_1" bold />
        <Text value="일 여행" type="text" bold />
      </div>

      {scheduleList.map((value, key) => (
        <div key={key} style={{ width: "90%" }}>
          <EditDayScheduleList day={key + 1} date={add(date, { days: key })} />
        </div>
      ))}
    </div>
  );
};

export default EditFullScheduleList;
