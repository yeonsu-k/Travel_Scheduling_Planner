import React from "react";
import styles from "../Main.module.css";

const MainTravelLogItem = () => {
  return (
    <div className={styles.logModalItem}>
      <div className={styles.logModalImgCont}>
        <img src="https://www.myro.co.kr/myro_image/travelog/blog_001.jpg" />
      </div>
      <div className={styles.logModalTextCont}>
        <span>장소 이름</span>
        <span>장소 주소</span>
      </div>
    </div>
  );
};

export default MainTravelLogItem;
