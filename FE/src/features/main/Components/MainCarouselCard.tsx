import React from "react";
import styles from "../Main.module.css";

interface CarouselCardProps {
  src: string;
}

const MainCarouselCard = ({ src }: CarouselCardProps) => {
  return (
    <div className={styles.carouselCard}>
      <img className={styles.carouselImg} src={src} />
    </div>
  );
};

export default MainCarouselCard;
