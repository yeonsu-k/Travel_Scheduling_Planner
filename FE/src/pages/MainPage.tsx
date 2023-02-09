import React from "react";
import styles from "../features/main/Main.module.css";
import MainDisplay from "../features/main/MainDisplay";
import MainTravelLog from "../features/main/MainTravelLog";

function MainPage() {
  return (
    <div>
      <MainDisplay />
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <MainTravelLog />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
