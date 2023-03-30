import React from "react";
import { DestinationConfig } from "slices/mainSlice";
import styles from "../Main.module.css";
import { LogConfig } from "../MainTravelLog";

interface CarouselCardProps {
  type: string;
  item?: DestinationConfig;
  info?: LogConfig;
}

const MainCarouselCard = ({ type, item, info }: CarouselCardProps) => {
  return (
    <div className={styles.carouselCardContainer}>
      {type == "log" ? (
        <>
          <div className={styles.carouselCard}>
            <img src={info?.src} />
          </div>
          <div className={styles.carouselTextLog}>
            <p>{info?.title}</p>
            <span>by {info?.author}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.carouselCard}>
            <img src={item?.regionImageURL} />
          </div>
          <div className={styles.carouselText}>
            <p>{item?.englishName}</p>
            <span>대한민국 {item?.regionName}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MainCarouselCard;
