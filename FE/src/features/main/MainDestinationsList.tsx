import React from "react";
import styles from "./Main.module.css";
import MainDestinationsFilter from "./MainDestinationsFilter";
import MainDestinationItem from "./MainDestinationsItem";
import Text from "components/Text";
import Button from "components/Button";

const MainDestinationsList = () => {
  return (
    <div>
      <div className={styles.mainTitleText}>
        <Text value="어디로 여행을 떠나시나요?" bold type="pageTitle" />
      </div>
      <div className={styles.mainSubTitleTextK}>
        <Text value="여행지를 검색하거나 목록에서 직접 선택해주세요." type="caption" color="lightgray" />
      </div>
      <div className={styles.container}>
        <div className={styles.mainInputContainer}>
          <div className={styles.mainInputIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <circle fill="none" stroke="#999" strokeWidth="1.1" cx="9" cy="9" r="7"></circle>
              <path fill="none" stroke="#999" strokeWidth="1.1" d="M14,14 L18,18 L14,14 Z"></path>
            </svg>
          </div>
          <input className={styles.mainInput} />
        </div>
      </div>
      <div className={styles.mainFilterContainer}>
        <MainDestinationsFilter />
      </div>
      <div className={styles.mainDestinationContainer}>
        <div className={styles.mainDestinationItem}>
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
          <MainDestinationItem />
        </div>
      </div>
      <div className={styles.upBtn}>
        <Button height="100%" text="여행지 선택화면으로 돌아가기" />
      </div>
    </div>
  );
};

export default MainDestinationsList;
