import React from "react";
import styles from "./Main.module.css";
import MainDestinationItem from "./MainDestinationsItem";

const MainDestinationsList = () => {
  return (
    <div>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>
          <b>어디로 여행을 떠나시나요?</b>
        </div>
        <div className={styles.mainSubTitleText}>여행지를 검색하거나 목록에서 직접 선택해주세요.</div>
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
      <div>추천순</div>
      <MainDestinationItem />
    </div>
  );
};

export default MainDestinationsList;
