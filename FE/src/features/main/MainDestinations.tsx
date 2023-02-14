import React from "react";
import styles from "../main/Main.module.css";
import MainCarousel from "./MainCarousel";

const MainDestinations = () => {
  return (
    <div>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>인기 여행지</div>
        <div className={styles.mainSubTitleText}>POPULAR DESTINATIONS</div>
      </div>
      <div>
        <MainCarousel />
      </div>
    </div>
  );
};

export default MainDestinations;
