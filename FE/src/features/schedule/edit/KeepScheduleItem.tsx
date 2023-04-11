import React, { useState } from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import DeleteItemModal from "./fullList/DeleteItemModal";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectKeepPlaceList, setKeepPlaceList } from "slices/scheduleEditSlice";

interface EditScheduleItemProps {
  img: string;
  placeName: string;
  time: string;
  index: number;
  // startTime: string;
  // endTime: string;
}

const KeepScheduleItem = ({ img, placeName, time, index }: EditScheduleItemProps) => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState(0);
  const keepList = useAppSelector(selectKeepPlaceList);
  const [deleteItemModal, setDeleteItemModal] = useState(false);

  const deleteScheduleItem = () => {
    const tmpList = [...keepList];
    tmpList.splice(index, 1);
    dispatch(setKeepPlaceList([...tmpList]));

    setDeleteItemModal(false);
  };

  return (
    <>
      {/* <div
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
      </div> */}

      <div className={styles.editScheduleItem}>
        <img className={styles.scheduleItemInfo} src={img} />

        <div className={styles.scheduleItemInfo}>
          <Text value={placeName} type="caption" />
        </div>

        <div className={styles.scheduleItemInfo}>
          <Text value="00:00" type="smallText" color="white" en />
          <div style={{ fontSize: "0.2rem", color: "white", height: "1%" }}>¯</div>
          <Text value="00:00" type="smallText" color="white" en />
        </div>

        <div className={styles.scheduleItemInfo}>{/* <Text value={time} type="smallText" color="yellow" /> */}</div>

        <div className={styles.scheduleItemInfo}>
          <Text value="시간표" type="smallText" />
        </div>
        <div className={styles.scheduleItemInfo}>
          <Text value="구매" type="smallText" />
        </div>
        <div className={styles.scheduleItemInfo}>
          <Text value="메모" type="smallText" />
        </div>
        <div className={styles.scheduleItemInfo} onClick={() => setDeleteItemModal(true)}>
          <Text value="삭제" type="smallText" />
        </div>

        {deleteItemModal && (
          <DeleteItemModal onClickDeleteItem={deleteScheduleItem} setDeleteItemModal={setDeleteItemModal} />
        )}
      </div>
    </>
  );
};

export default KeepScheduleItem;
