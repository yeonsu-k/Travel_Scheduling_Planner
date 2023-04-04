import React from "react";
import styles from "../Edit.module.css";
import { selectFullScheduleList, selectScheduleList } from "slices/scheduleEditSlice";
import { selectRegion } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import Text from "components/Text";
import EditDayScheduleList from "./EditDayScheduleList";

const EditFullScheduleList = () => {
  const region = useAppSelector(selectRegion).name;

  const fullScheduleList = useAppSelector(selectFullScheduleList);
  const scheduleList = useAppSelector(selectScheduleList);

  return (
    <div className={styles.editFullScheduleList}>
      <div>
        <Text value={`${region} : `} type="text" bold />
        <Text value={`${scheduleList.length}`} type="text" color="day_1" bold />
        <Text value="일 여행" type="text" bold />
      </div>

      {scheduleList.map((value, key) => (
        <div key={key} style={{ width: "90%" }}>
          <EditDayScheduleList day={value[key].day} />
        </div>
      ))}
    </div>
  );
};

export default EditFullScheduleList;
