import React, { useEffect } from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { placeInfoConfig, selectFullScheduleList } from "slices/scheduleEditSlice";
import { useAppSelector } from "app/hooks";

interface EditDayMoveItemProps {
  day: number;
  step: number;
}

const EditDayMoveItem = ({ day, step }: EditDayMoveItemProps) => {
  const dayList = useAppSelector(selectFullScheduleList)[day - 1].dayList;

  const startPoint = dayList[step];
  const endPoint = dayList[step + 1];

  const onClickDetailRoute = () => {
    window.open(process.env.REACT_APP_KAKAO_MAP_URL + `/?sName=${startPoint.name}&eName=${endPoint.name}`);
  };

  return (
    <div className={styles.editDayMoveItem}>
      <div className={styles.moveItemInfo}>
        <Text value={`STEP${step + 1}`} color="yellow" bold en />
      </div>

      <div className={styles.moveItemInfo}>
        <Text value={startPoint.name} type="smallText" />
      </div>
      <div className={styles.moveItemInfo}>
        <ArrowDropDownIcon fontSize="small" />
      </div>
      <div className={styles.moveItemInfo}>
        <Text value={endPoint.name} type="smallText" />
      </div>

      <div className={styles.moveItemInfo} onClick={onClickDetailRoute}>
        상세
        <br />
        경로
      </div>
    </div>
  );
};

export default EditDayMoveItem;
