import React from "react";
import styles from "../main/Main.module.css";
import MainCarousel from "./MainCarousel";
import MainCarouselTest from "./MainCarousel";

const MainTravelLog = () => {
  const images = [
    { src: "https://www.myro.co.kr/myro_image/travelog/blog_001.jpg" },
    { src: "https://www.myro.co.kr/myro_image/travelog/blog_002.jpg" },
    { src: "https://www.myro.co.kr/myro_image/travelog/blog_003.jpg" },
    { src: "https://www.myro.co.kr/myro_image/travelog/blog_004.jpg" },
    { src: "https://www.myro.co.kr/myro_image/travelog/blog_005.jpg" },
  ];
  return (
    <div id={styles.travelLog}>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>여행기</div>
        <div className={styles.mainSubTitleText}>TRAVELOG</div>
      </div>
      <MainCarouselTest type="log" images={images} />
    </div>
  );
};

export default MainTravelLog;
