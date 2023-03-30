import React from "react";
import styles from "../Main.module.css";
import MainCarousel from "../Components/MainCarousel";

export interface LogConfig {
  title: string;
  src: string;
  author: string;
}

const MainTravelLog = () => {
  const images: LogConfig[] = [
    {
      title: "경주 여행 한복과 함께라면 인생사진 성공",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_001.jpg",
      author: "MYRO blog",
    },
    {
      title: "홍천&춘천 여행을 위한 애견동반 리조트",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_002.jpg",
      author: "MYRO blog",
    },
    {
      title: "하와이 랜선여행, 꼭 둘러봐야할 곳 9곳 소개",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_004.jpg",
      author: "MYRO blog",
    },
    {
      title: "남원 가볼 만한 곳",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_minhae9191.jpg",
      author: "미네쿠의 세계여행",
    },
    {
      title: "강릉 아르떼뮤지엄 1박2일",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_005.jpg",
      author: "MYRO blog",
    },
    {
      title: "영월, 봄에 가볼 만한 곳 모아 모아",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_009.jpg",
      author: "MYRO blog",
    },
    {
      title: "괌으로 겨울 여행 떠나는 세 가지 이유",
      src: "https://www.myro.co.kr/myro_image/travelog/blog_006.jpg",
      author: "MYRO blog",
    },
  ];
  return (
    <div id={styles.travelLog}>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>여행기</div>
        <div className={styles.mainSubTitleText}>TRAVELOG</div>
      </div>
      <MainCarousel type="log" images={images} />
    </div>
  );
};

export default MainTravelLog;
