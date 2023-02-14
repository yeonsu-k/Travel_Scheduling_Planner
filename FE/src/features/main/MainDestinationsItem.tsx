import React from "react";
import styles from "./Main.module.css";

const MainDestinationItem = () => {
  return (
    <div>
      <div className={styles.card}>
        <div>
          <img className={styles.cardImg} src="https://www.myro.co.kr/myro_image/city/guam.jpg" />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardEngTitle}>JEJU</div>
          <div className={styles.cardTitle}>대한민국 제주도</div>
        </div>
      </div>
    </div>
  );
};

export default MainDestinationItem;
