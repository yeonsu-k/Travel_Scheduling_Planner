import React from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Input from "components/Input";

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
                <span className={styles.scheduleTextInput} style={{ color: "#666" }}>
                  <Input placeholder="여행이름" />
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="none"
                    stroke="#999"
                    d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"
                  ></path>
                  <polyline
                    fill="none"
                    stroke="#999"
                    points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"
                  ></polyline>
                </svg>
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
