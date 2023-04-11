import React, { useEffect } from "react";
import styles from "../Main.module.css";
import defaultPhoto from "asset/defaultPhoto.jpg";
import { locationConfig } from "slices/mainSlice";

interface MainTravelLogItemProps {
  location: locationConfig;
}

const MainTravelLogItem = ({ location }: MainTravelLogItemProps) => {
  return (
    <div className={styles.logModalItem}>
      <div className={styles.logModalImgCont}>
        <img src={location.location.locationURL ? location.location.locationURL : defaultPhoto} />
      </div>
      <div className={styles.logModalTextCont}>
        <span>{location.location.locationName}</span>
        <span>{location.location.address}</span>
      </div>
    </div>
  );
};

export default MainTravelLogItem;
