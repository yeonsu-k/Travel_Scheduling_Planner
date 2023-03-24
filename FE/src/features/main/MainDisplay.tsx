import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import MainMobileContainer from "./MainMobileContainer";

const MainDisplay = () => {
  /* 메인화면 애니메이션 잠정 보류 ... */
  // const stepRef = useRef(null);
  // useEffect(() => {
  //   const options = {};
  //   const callback = (entries: any, observer: any) => {
  //     entries.forEach((entry: any) => {
  //       if (entry.isIntersecting) {
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   };
  //   const observer = new IntersectionObserver(callback, options);
  //   if (stepRef.current) {
  //     observer.observe(stepRef.current);
  //   }
  // }, []);

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
                <div className={styles.button}>시작하기</div>
              </div>
            </div>
            <video autoPlay muted loop className={styles.video}>
              <source src={require("../../asset/main/MainMovie6.mp4")} type="video/mp4" />
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
