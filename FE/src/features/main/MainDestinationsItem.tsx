import React from "react";
import styles from "./Main.module.css";

const MainDestinationItem = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        <img src="https://www.myro.co.kr/myro_image/city/jeju.jpg" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardEngTitle}>JEJU</div>
        <div className={styles.cardTitle}>대한민국 제주도</div>
      </div>
    </div>
  );
};

export default MainDestinationItem;
