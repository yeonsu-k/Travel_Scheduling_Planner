import React from "react";
import styles from "../Main.module.css";
import defaultPhoto from "asset/defaultPhoto.jpg";

interface MainTravelLogItemProps {
  location: any;
}

const MainTravelLogItem = ({ location }: MainTravelLogItemProps) => {
  return (
    <div className={styles.logModalItem}>
      <div className={styles.logModalImgCont}>
        <img src={location.locationURL ? location.locationURL : defaultPhoto} />
      </div>
      <div className={styles.logModalTextCont}>
        <span>{location.locationName}</span>
        <span>{location.address}</span>
      </div>
    </div>
  );
};

export default MainTravelLogItem;
