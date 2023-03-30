import React from "react";
import { DestinationConfig } from "slices/mainSlice";
import styles from "../Main.module.css";

interface CarouselCardProps {
  type: string;
  item?: DestinationConfig;
}

const MainCarouselCard = ({ type, item }: CarouselCardProps) => {
  return (
    <div className={styles.carouselCardContainer}>
      <div className={styles.carouselCard}>
        <img src={item?.regionImageURL} />
      </div>
      <div className={styles.carouselText}>
        <p>{item?.englishName}</p>
        <span>대한민국 {item?.regionName}</span>
      </div>
    </div>
  );
};

export default MainCarouselCard;
