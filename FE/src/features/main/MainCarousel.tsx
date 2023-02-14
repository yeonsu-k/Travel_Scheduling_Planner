import React from "react";
import styles from "./Main.module.css";

const MainCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.window}>
        <div className={styles.flexBox}>
          <div className={styles.flexBoxImg}>
            <img src="https://www.myro.co.kr/myro_image/travelog/blog_001.jpg" />
            <img src="https://www.myro.co.kr/myro_image/travelog/blog_002.jpg" />
            <img src="https://www.myro.co.kr/myro_image/travelog/blog_003.jpg" />
            <img src="https://www.myro.co.kr/myro_image/travelog/blog_004.jpg" />
            <img src="https://www.myro.co.kr/myro_image/travelog/blog_005.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
