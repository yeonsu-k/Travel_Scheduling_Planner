import React from "react";
import styles from "../main/Main.module.css";
import MainCarousel from "./MainCarousel";

const MainTravelLog = () => {
  return (
    <div>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>여행기</div>
        <div className={styles.mainSubTitleText}>TRAVELOG</div>
      </div>
      <div>
        <MainCarousel />
      </div>
    </div>
  );
};

export default MainTravelLog;
