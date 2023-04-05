import React, { useMemo, useRef, useState } from "react";
import styles from "./Main.module.css";
import MainMobileContainer from "./MainMobileContainer";

interface Props {
  onMoveToElement: () => void;
}

const MainDisplay = ({ onMoveToElement }: Props) => {
  const [videoNum, setVideoNum] = useState(Math.floor(Math.random() * 15) + 1);
  const videoRef = useRef<HTMLVideoElement>(null);
  // 다른 영상으로 자동 재생
  // const getRandomIndexArray = () => {
  //   const randomIndexArray = new Array(15);
  //   for (let i = 0; i < 15; i++) {
  //     const randomNum = Math.floor(Math.random() * 15) + 1;
  //     if (!randomIndexArray.includes(randomNum)) {
  //       randomIndexArray[i] = randomNum;
  //     } else {
  //       i--;
  //     }
  //   }
  //   return randomIndexArray;
  // };
  // const cityData = useMemo<number[]>(() => getRandomIndexArray(), []);

  const handleVideoEnded = () => {
    if (!videoRef.current) return;
    if (videoNum + 1 == 16) setVideoNum(0);
    else setVideoNum(videoNum + 1);
  };

  return (
    <div>
      <div id={styles.mainDisplay}>
        <div className={styles.display_row}>
          <div className={styles.grid}>
            <div className={styles.mainLeftSide}>
              <div>
                <div className={styles.subtitleText}>AI 여행 스케줄링 플래너</div>
                <div className={styles.titleText}>
                  <b>MYRO</b>
                </div>
                <div className={styles.button} onClick={onMoveToElement}>
                  시작하기
                </div>
              </div>
            </div>
            <video autoPlay muted loop className={styles.video} ref={videoRef} onEnded={handleVideoEnded}>
              <source src={`https://www.myro.co.kr/myro_video/MainMovie${videoNum}.mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepDesc}>
            <div className={styles.stepDescLeft}>
              <div className={styles.stepDescTextContainer}>
                <div className={styles.stepDescText}>여행 일자, 숙소, 가고 싶은 장소만</div>
                <div className={styles.stepDescText}>선택하면 일정이 자동으로 완성되는</div>
                <div className={styles.stepDescText}>쉽고 간편한 여행 일정 플래너</div>
              </div>
            </div>
            <div className={styles.stepContainer}>
              <div>
                <div className={styles.stepDescTextTitle}>STEP 1</div>
                <div className={styles.stepDescTextCont}>여행지선택</div>
              </div>
              <div>
                <div className={styles.stepDescTextTitle}>STEP 2</div>
                <div className={styles.stepDescTextCont}>장소선택</div>
              </div>
              <div>
                <div className={styles.stepDescTextTitle}>STEP 3</div>
                <div className={styles.stepDescTextCont}>일정생성</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainMobileContainer />
    </div>
  );
};

export default MainDisplay;
