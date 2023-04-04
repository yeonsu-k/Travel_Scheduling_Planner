import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import colorPalette from "styles/colorPalette";
import DeleteItemModal from "./DeleteItemModal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectFullScheduleList, setFullScheduleList, setStayTime } from "slices/scheduleEditSlice";

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
  const [hour, setHour] = useState(parseInt(stayTime[0]));
  const [minute, setMinute] = useState(parseInt(stayTime[1]));
  const [inputHour, setInputHour] = useState(hour);
  const [inputMinute, setInputMinute] = useState(minute);
  const [deleteItemModal, setDeleteItemModal] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onClickSaveStayTime = () => {
    setHour(inputHour);
    setMinute(inputMinute);
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

  const setTime = () => {
    const moveHour = Math.floor(input / 60);
    const moveMinute = input % 60;
    let startHour, startMinute, endHour, endMinute;

    if (index === 0) {
      startHour = fullList[day - 1].startHour;
      startMinute = fullList[day - 1].startMinute;

      startHour += moveHour;
      startMinute += moveMinute;

      endHour = startHour + hour;
      endMinute = startMinute + minute;
    } else {
      const prevTime = fullList[day - 1].dayList[index - 1].endTime.split(":");
      console.log("prevTime", prevTime);
      startHour = parseInt(prevTime[0]);
      startMinute = parseInt(prevTime[1]);

      startHour += moveHour;
      startMinute += moveMinute;

      endHour = startHour + hour;
      endMinute = startMinute + minute;
    }

    let startTimeStr: string, endTimeStr: string;

    if (startMinute < 10) {
      startTimeStr = `${startHour}:0${startMinute}`;
      setStartTime(startTimeStr);
    } else {
      startTimeStr = `${startHour}:${startMinute}`;
      setStartTime(startTimeStr);
    }

    if (endMinute >= 60) {
      const plusHour = Math.floor(endMinute / 60);
      const minute = endMinute % 60;

      endHour += plusHour;
      endMinute = minute;
    }

    if (endMinute < 10) {
      endTimeStr = `${endHour}:0${endMinute}`;
      setEndTime(endTimeStr);
    } else {
      endTimeStr = `${endHour}:${endMinute}`;
      setEndTime(endTimeStr);
    }

    dispatch(setStayTime({ day: day, index: index, startTime: startTimeStr, endTime: endTimeStr }));
  };

  useEffect(() => {
    setTime();
  }, []);

  useEffect(() => {
    setTime();
  }, [input, hour, minute, startTime, endTime]);

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
            <Text value={startTime} type="smallText" color="white" en />
            <div style={{ fontSize: "0.2rem", color: "white", height: "1%" }}>¯</div>
            <Text value={endTime} type="smallText" color="white" en />
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
