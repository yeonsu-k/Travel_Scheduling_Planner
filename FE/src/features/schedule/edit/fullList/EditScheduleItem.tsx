import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import colorPalette from "styles/colorPalette";
import DeleteItemModal from "./DeleteItemModal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectScheduleList, setStayTime, setscheduleList } from "slices/scheduleEditSlice";

interface EditScheduleItemProps {
  day: number;
  index: number;
  img: string;
  placeName: string;
  time: string;
  startTime: string;
  endTime: string;
}

const EditScheduleItem = ({ day, index, img, placeName, time, startTime, endTime }: EditScheduleItemProps) => {
  const dispatch = useAppDispatch();

  const scheduleList = useAppSelector(selectScheduleList);
  const [input, setInput] = useState(scheduleList[day - 1][index].duration);
  const [changeStayTime, setChangeStayTime] = useState(false);
  const stayTime = time.split(":");
  const [hour, setHour] = useState(parseInt(stayTime[0]));
  const [minute, setMinute] = useState(parseInt(stayTime[1]));
  const [inputHour, setInputHour] = useState(hour);
  const [inputMinute, setInputMinute] = useState(minute);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  let startMinute = startTime.split(":")[1];
  let endMinute = endTime.split(":")[1];

  if (startMinute.length !== 2) {
    startMinute = "0" + startMinute;
    startTime = startTime.split(":")[0] + ":" + startMinute;
  }
  if (endMinute.length !== 2) {
    endMinute = "0" + endMinute;
    endTime = endTime.split(":")[0] + ":" + endMinute;
  }

  // const [startTime, setStartTime] = useState("");
  // const [endTime, setEndTime] = useState("");

  const onClickSaveStayTime = () => {
    setHour(inputHour);
    setMinute(inputMinute);
    setChangeStayTime(false);
    let endHour = parseInt(endTime.split(":")[0]);
    let endMinute = parseInt(endTime.split(":")[1]);

    endHour += inputHour;
    endMinute += inputMinute;

    if (endMinute >= 60) {
      endHour += 1;
      endMinute -= 60;
    }

    endTime = endHour.toString() + ":" + endMinute.toString();
    console.log("endTime", endTime);

    dispatch(setStayTime({ day: day, index: index, startTime: startTime, endTime: endTime }));

    for (let i = index + 1; i < scheduleList[day - 1].length; i++) {
      let startH = parseInt(scheduleList[day - 1][i].startTime.split(":")[0]);
      let startM = parseInt(scheduleList[day - 1][i].startTime.split(":")[1]);
      let endH = parseInt(scheduleList[day - 1][i].endTime.split(":")[0]);
      let endM = parseInt(scheduleList[day - 1][i].endTime.split(":")[1]);

      startH += inputHour;
      startM += inputMinute;
      endH += inputHour;
      endH += inputMinute;

      if (startM >= 60) {
        startH += 1;
        startM -= 60;
      }
      if (endM >= 60) {
        endH += 1;
        endM -= 60;
      }

      const start = startH.toString() + ":" + startM.toString();
      const end = endH.toString() + ":" + endM.toString();
      console.log("start", start);
      console.log("end", end);

      dispatch(setStayTime({ day: day, index: i, startTime: start, endTime: end }));
    }
  };

  const onClickDeleteItem = () => {
    setDeleteItemModal(true);
  };

  const deleteScheduleItem = () => {
    const tmpList = scheduleList.map((value) => value.slice());
    tmpList[day - 1].splice(index, 1);
    dispatch(setscheduleList([...tmpList]));
    console.log("삭제 후", scheduleList);

    if (index !== 0) {
      const prevData = scheduleList[day - 1][index - 1];
      const prevHour = prevData.endTime.split(":")[0];
      const prevMinute = prevData.endTime.split(":")[1];

      let nowHour = parseInt(prevHour);
      let nowMinute = parseInt(prevMinute) + prevData.duration;

      if (nowMinute >= 60) {
        nowHour += 1;
        nowMinute -= 60;
      }

      startTime = nowHour.toString() + ":" + nowMinute.toString();

      let endHour = nowHour + hour;
      let endMinute = nowMinute + minute;
      if (endMinute >= 60) {
        endHour += 1;
        endMinute -= 60;
      }
      endTime = endHour.toString() + ":" + endMinute.toString();

      console.log("삭제 후 startTime", startTime);
      console.log("삭제 후 endTime", endTime);
      dispatch(setStayTime({ day: day, index: index, startTime: startTime, endTime: endTime }));

      for (let i = index + 1; i < scheduleList[day - 1].length; i++) {
        const prevData = scheduleList[day - 1][i - 1];
        const prevHour = prevData.endTime.split(":")[0];
        const prevMinute = prevData.endTime.split(":")[1];

        let nowHour = parseInt(prevHour);
        let nowMinute = parseInt(prevMinute) + prevData.duration;

        if (nowMinute >= 60) {
          nowHour += 1;
          nowMinute -= 60;
        }

        startTime = nowHour.toString() + ":" + nowMinute.toString();

        let endHour = nowHour + hour;
        let endMinute = nowMinute + minute;
        if (endMinute >= 60) {
          endHour += 1;
          endMinute -= 60;
        }
        endTime = endHour.toString() + ":" + endMinute.toString();

        console.log("삭제 후 startTime", startTime);
        console.log("삭제 후 endTime", endTime);
        dispatch(setStayTime({ day: day, index: i, startTime: startTime, endTime: endTime }));
      }
    } else {
      const nextData = scheduleList[day - 1][index + 1];
      console.log("nextData", nextData);
      let hour = parseInt(nextData.endTime.split(":")[0]) - parseInt(nextData.startTime.split(":")[0]);
      let minute = parseInt(nextData.endTime.split(":")[1]) - parseInt(nextData.startTime.split(":")[1]);

      console.log("변경 전", startTime);
      console.log("변경 전", endTime);
      console.log("변경 전 장소", placeName);
      if (minute < 0) {
        hour -= 1;
        minute += 60;
      }
      startTime = "10:00";

      let endHour = 10 + hour;
      let endMinute = 0 + minute;
      if (endMinute >= 60) {
        endHour += 1;
        endMinute -= 60;
      }
      console.log("hour", hour);
      console.log("minute", minute);
      endTime = endHour.toString() + ":" + endMinute.toString();

      console.log("삭제 후 startTime", startTime);
      console.log("삭제 후 endTime", endTime);
      dispatch(setStayTime({ day: day, index: index, startTime: startTime, endTime: endTime }));
      console.log("지금 index", index);

      for (let i = index + 1; i < scheduleList[day - 1].length - 1; i++) {
        const prevData = scheduleList[day - 1][i];
        const prevHour = prevData.endTime.split(":")[0];
        const prevMinute = prevData.endTime.split(":")[1];

        let nowHour = parseInt(prevHour);
        let nowMinute = parseInt(prevMinute) + prevData.duration;

        if (nowMinute >= 60) {
          nowHour += 1;
          nowMinute -= 60;
        }

        startTime = nowHour.toString() + ":" + nowMinute.toString();

        let endHour = nowHour + hour;
        let endMinute = nowMinute + minute;
        if (endMinute >= 60) {
          endHour += 1;
          endMinute -= 60;
        }
        endTime = endHour.toString() + ":" + endMinute.toString();

        console.log("삭제 후 startTime", startTime);
        console.log("삭제 후 endTime", endTime);
        dispatch(setStayTime({ day: day, index: i, startTime: startTime, endTime: endTime }));
      }
    }

    setDeleteItemModal(false);
  };

  const onChangeDuration = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.valueAsNumber);
    const num = e.target.valueAsNumber - input;
    console.log("num", num);
    for (let i = index + 1; i < scheduleList[day - 1].length; i++) {
      const currentStartHour = scheduleList[day - 1][i].startTime.split(":")[0];
      const currentStartMinute = scheduleList[day - 1][i].startTime.split(":")[1];
      let durationHour = 0;
      if (num > 0) {
        durationHour = Math.floor(num / 60);
        console.log("durationHOur", durationHour);
      }

      const durationMinute = Math.floor(num % 60);
      console.log("durationMinute", durationMinute);
      let nextStartHour = parseInt(currentStartHour) + durationHour;
      let nextStartMinute = parseInt(currentStartMinute) + durationMinute;
      console.log(`start : ${nextStartHour}:${nextStartMinute}`);
      if (nextStartMinute >= 60) {
        nextStartHour += Math.floor(nextStartMinute / 60);
        nextStartMinute -= 60 * Math.floor(nextStartMinute / 60);
      }
      const start = nextStartHour.toString() + ":" + nextStartMinute.toString();

      let nextEndHour = parseInt(scheduleList[day - 1][i].endTime.split(":")[0]) + durationHour;
      let nextEndMinute = parseInt(scheduleList[day - 1][i].endTime.split(":")[1]) + durationMinute;
      if (nextEndMinute >= 60) {
        nextEndHour += Math.floor(nextEndMinute / 60);
        nextEndMinute -= 60 * Math.floor(nextEndMinute / 60);
      }
      const end = nextEndHour.toString() + ":" + nextEndMinute.toString();

      dispatch(setStayTime({ day: day, index: i, startTime: start, endTime: end }));
    }
  };

  return (
    <>
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

      {index === scheduleList[day - 1].length - 1 ? (
        <></>
      ) : (
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeDuration(e)}
          />
          <Text value="분" type="caption" />
        </div>
      )}

      {deleteItemModal && (
        <DeleteItemModal onClickDeleteItem={deleteScheduleItem} setDeleteItemModal={setDeleteItemModal} />
      )}
    </>
  );
};

export default EditScheduleItem;

EditScheduleItem.defaultProps = {
  time: "00:00",
};
