import React from "react";
import styles from "./Edit.module.css";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import Text from "components/Text";
import EditDayScheduleList from "./EditDayScheduleList";

const EditFullScheduleList = () => {
  const { place } = useAppSelector((state: rootState) => state.map);

  return (
    <div className={styles.editFullScheduleList}>
      <div>
        <Text value={`${place} : `} type="text" bold />
        <Text value="3" type="text" color="day_1" bold />
        <Text value="일 여행" type="text" bold />
      </div>

      <EditDayScheduleList />
    </div>
  );
};

export default EditFullScheduleList;
