import React from "react";
import styles from "../main/Main.module.css";
import MainCarouselTest from "./MainCarousel";

const MainDestinations = () => {
  const images = [
    { src: "https://www.myro.co.kr/myro_image/city/gyeongju.jpg" },
    { src: "https://www.myro.co.kr/myro_image/city/seoul.jpg" },
    { src: "https://www.myro.co.kr/myro_image/city/gangneung.jpg" },
    { src: "https://www.myro.co.kr/myro_image/city/yeosu.jpg" },
    { src: "https://www.myro.co.kr/myro_image/city/jeju.jpg" },
    { src: "https://www.myro.co.kr/myro_image/city/busan.jpg" },
  ];
  return (
    <div>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>인기 여행지</div>
        <div className={styles.mainSubTitleText}>POPULAR DESTINATIONS</div>
      </div>
      <div>
        <MainCarouselTest type="destination" images={images} />
      </div>
    </div>
  );
};

export default MainDestinations;
