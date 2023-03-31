import React from "react";
import styles from "../Main.module.css";

interface MainTravelLogItemProps {
  location: any;
}

const MainTravelLogItem = ({ location }: MainTravelLogItemProps) => {
  return (
    <div className={styles.logModalItem}>
      <div className={styles.logModalImgCont}>
        <img src="https://www.myro.co.kr/getSpotImage/gyeongju?no=1110" />
      </div>
      <div className={styles.logModalTextCont}>
        <span>{location.locationName}</span>
        <span>{location.address}</span>
      </div>
    </div>
  );
};

export default MainTravelLogItem;
