import Text from "components/Text";
import React from "react";
import styles from "./Main.module.css";

const MainMobileContainer = () => {
  return (
    <div className={styles.mobileContainer}>
      <div className={styles.mobileSubTitleText}>
        <span>AI 여행 스케줄링 플래너 마이로</span>
      </div>
      <div className={styles.mobileTitleText}>
        <Text value="myro" type="pageTitle" bold />
      </div>
    </div>
  );
};

export default MainMobileContainer;
