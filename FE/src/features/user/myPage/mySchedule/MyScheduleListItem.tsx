import React from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";
import Button from "components/Button";

const MyScheduleListItem = () => {
  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleDDAY}>D-18</div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleImgContainer}>
          <img className={styles.scheduleImg} src="https://myro.co.kr/myro_image/city/busan.jpg" alt="" />
          <div className={styles.scheduleInfo}>
            <Text value="BUSAN" type="groupTitle" bold />
            <span className={styles.scheduleInfoRegion}>대한민국 부산</span>
            <span className={styles.scheduleInfoEmail}>kkk@naver.com</span>
          </div>
        </div>
        <div className={styles.scheduleContContainer}>
          <div className={styles.scheduleContent}>
            <div className={styles.scheduleContTitle}>
              <div className={styles.scheduleTextTop}>
                <span className={styles.scheduleTextTitle}>여행이름</span>
                <span className={styles.scheduleTextCont} style={{ color: "#666" }}>
                  여행이름
                </span>
              </div>
              <div className={styles.scheduleTextTop}>
                <span className={styles.scheduleTextTitle}>최종수정</span>
                <span className={styles.scheduleTextCont}>2023.2.1</span>
              </div>
            </div>
            <div className={styles.scheduleContTitle}>
              <div className={styles.scheduleTextBot}>
                <span className={styles.scheduleTextTitle}>여행일자</span>
                <span className={styles.scheduleTextCont}>2023.2.11-2023.2.13</span>
              </div>
              <div className={styles.scheduleTextBot}>
                <span className={styles.scheduleTextTitle}>선택장소</span>
                <span className={styles.scheduleTextCont}>11</span>
              </div>
            </div>
          </div>
          <div className={styles.scheduleBtn}>
            <Button text="일정 수정" />
            <Button text="일정표" />
            <Button text="일정 공유" />
            <Button text="일정 삭제" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleListItem;
