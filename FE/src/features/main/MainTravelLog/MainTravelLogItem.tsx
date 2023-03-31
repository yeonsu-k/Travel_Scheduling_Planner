import React from "react";
import styles from "../Main.module.css";
import { locationConfig } from "slices/mainSlice";

interface MainTravelLogItemProps {
  location: any;
}

const MainTravelLogItem = ({ location }: MainTravelLogItemProps) => {
  return (
    <div className={styles.logModalItem}>
      <div className={styles.logModalImgCont}>
        <img src="https://www.myro.co.kr/myro_image/travelog/blog_001.jpg" />
      </div>
      <div className={styles.logModalTextCont}>
        <span>{location.locationName}</span>
        <span>{location.address}</span>
      </div>
    </div>
  );
};

export default MainTravelLogItem;
