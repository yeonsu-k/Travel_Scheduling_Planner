import React, { ChangeEvent, useState } from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import colorPalette from "styles/colorPalette";
import DeleteItemModal from "./DeleteItemModal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectFullScheduleList, setFullScheduleList } from "slices/scheduleEditSlice";

interface EditScheduleItemProps {
  day: number;
  index: number;
  img: string;
  placeName: string;
  time: string;
  // startTime: string;
  // endTime: string;
}

const EditScheduleItem = ({ day, index, img, placeName, time }: EditScheduleItemProps) => {
  const dispatch = useAppDispatch();

  const fullList = useAppSelector(selectFullScheduleList);
  const [input, setInput] = useState(0);
  const [changeStayTime, setChangeStayTime] = useState(false);
  const stayTime = time.split(":");
  const hour = parseInt(stayTime[0]);
  const minute = parseInt(stayTime[1]);
  const [inputHour, setInputHour] = useState(hour);
  const [inputMinute, setInputMinute] = useState(minute);
  const [deleteItemModal, setDeleteItemModal] = useState(false);

  const onClickSaveStayTime = () => {
    setChangeStayTime(false);
  };

  const onClickDeleteItem = () => {
    setDeleteItemModal(true);
  };

  const deleteScheduleItem = () => {
    const tmpList = JSON.parse(JSON.stringify(fullList));
    tmpList[day - 1].dayList.splice(index, 1);

    dispatch(setFullScheduleList([...tmpList]));
    setDeleteItemModal(false);
  };

  return (
    <>
      <div
        style={{
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: colorPalette.darkgray,
        }}
      >
        <MoreVertIcon fontSize="small" />
        <input
          type="number"
          value={input}
          min={0}
          className={styles.moveTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.valueAsNumber)}
        />
        <Text value="분" type="caption" />
      </div>

      {changeStayTime ? (
        <div className={styles.changeTime}>
          <div className={styles.changeTimeInfo}>
            <Text value="머무는 시간 설정" type="caption" />
          </div>

          <div className={styles.changeTimeInfo}>
            <input
              type="number"
              value={inputHour}
              className={styles.changeTimeValue}
              min={2}
              color={colorPalette.yellow}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputHour(e.target.valueAsNumber)}
            />
            <Text value="시간 " type="caption" />
            <input
              type="number"
              value={inputMinute}
              className={styles.changeTimeValue}
              min={0}
              max={60}
              color={colorPalette.yellow}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMinute(e.target.valueAsNumber)}
            />
            <Text value="분" type="caption" />
          </div>

          <div className={styles.changeTimeInfo} onClick={onClickSaveStayTime}>
            <Text value="완료" color="white" type="caption" />
          </div>
        </div>
      ) : (
        <div className={styles.editScheduleItem}>
          <img className={styles.scheduleItemInfo} src={img} />

          <div className={styles.scheduleItemInfo}>
            <Text value={placeName} type="caption" />
          </div>

          <div className={styles.scheduleItemInfo} onClick={() => setChangeStayTime(true)}>
            <Text value="00:00" type="smallText" color="white" en />
            <div style={{ fontSize: "0.2rem", color: "white", height: "1%" }}>¯</div>
            <Text value="00:00" type="smallText" color="white" en />
          </div>

          <div className={styles.scheduleItemInfo}>
            <Text value={`${hour}시간 ${minute}분`} type="smallText" color="yellow" />
          </div>

          <div className={styles.scheduleItemInfo}>
            <Text value="시간표" type="smallText" />
          </div>
          <div className={styles.scheduleItemInfo}>
            <Text value="구매" type="smallText" />
          </div>
          <div className={styles.scheduleItemInfo}>
            <Text value="메모" type="smallText" />
          </div>
          <div className={styles.scheduleItemInfo} onClick={onClickDeleteItem}>
            <Text value="삭제" type="smallText" />
          </div>
        </div>
      )}

      {deleteItemModal && (
        <DeleteItemModal onClickDeleteItem={deleteScheduleItem} setDeleteItemModal={setDeleteItemModal} />
      )}
    </>
  );
};

export default EditScheduleItem;
