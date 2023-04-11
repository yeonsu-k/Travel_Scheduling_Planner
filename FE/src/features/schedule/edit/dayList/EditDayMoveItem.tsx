import React from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { selectScheduleList } from "slices/scheduleEditSlice";
import { useAppSelector } from "app/hooks";

interface EditDayMoveItemProps {
  day: number;
  step: number;
}

const EditDayMoveItem = ({ day, step }: EditDayMoveItemProps) => {
  const dayList = useAppSelector(selectScheduleList)[day - 1];

  const startPoint = dayList[step];
  const endPoint = dayList[step + 1];

  const onClickDetailRoute = () => {
    window.open(
      process.env.REACT_APP_KAKAO_MAP_URL +
        `/?sName=${startPoint.location.locationName}&eName=${endPoint.location.locationName}`,
    );
  };

  return (
    <div className={styles.editDayMoveItem}>
      <div className={styles.moveItemInfo}>
        <Text value={`STEP${step + 1}`} color="yellow" bold en />
      </div>

      <div className={styles.moveItemInfo}>
        <Text value={startPoint.location.locationName} type="smallText" />
      </div>
      <div className={styles.moveItemInfo}>
        <ArrowDropDownIcon fontSize="small" />
      </div>
      <div className={styles.moveItemInfo}>
        <Text value={endPoint.location.locationName} type="smallText" />
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
