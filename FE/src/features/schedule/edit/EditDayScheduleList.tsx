import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import EditScheduleItem from "./EditScheduleItem";

const EditDayScheduleList = () => {
  return (
    <div className={styles.editDayScheduleList}>
      <Text value="1DAY 2월 23일 목" en />
      <div style={{ margin: "1vh" }}></div>
      <Text value="일차를 누르면 일정 전체 변경이 가능합니다." type="smallText" />
      <div style={{ margin: "1.5vh" }}></div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.dayColor}></div> &nbsp;&nbsp;
        <Text value="3 places" />
      </div>

      <hr style={{ backgroundColor: "#c5c5c5", height: "1px", border: "0", width: "95%" }} />

      <EditScheduleItem />
      <EditScheduleItem />
    </div>
  );
};

export default EditDayScheduleList;
