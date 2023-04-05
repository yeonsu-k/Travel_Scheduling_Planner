import MainFooter from "features/main/MainFooter";
import React, { useRef } from "react";
import styles from "../features/main/Main.module.css";
import MainDestinations from "../features/main/MainDestinations/MainDestinations";
import MainDestinationsList from "../features/main/MainDestinations/MainDestinationsList";
import MainDisplay from "../features/main/MainDisplay";
import MainTravelLog from "../features/main/MainTravelLog/MainTravelLog";

export const useMoveScroll = () => {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return { element, onMoveToElement };
};

const MainPage = () => {
  const { element, onMoveToElement } = useMoveScroll();
  return (
    <div>
      <MainDisplay onMoveToElement={onMoveToElement} />
      <div className={styles.container}>
        <div className={styles.containerInner}>
          <MainTravelLog />
          <MainDestinations element={element} />
          <MainDestinationsList onMoveToElement={onMoveToElement} />
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default MainPage;
