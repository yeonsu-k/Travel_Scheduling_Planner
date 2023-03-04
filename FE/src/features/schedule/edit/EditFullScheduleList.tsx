import React from "react";
import styles from "./Edit.module.css";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import Text from "components/Text";
import EditDayScheduleList from "./EditDayScheduleList";
import { selectFullScheduleList } from "slices/scheduleEditSlice";

const EditFullScheduleList = () => {
  const { place } = useAppSelector((state: rootState) => state.map);

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
