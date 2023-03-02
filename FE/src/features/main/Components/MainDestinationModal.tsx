import React, { useState } from "react";
import styles from "../Main.module.css";
import Text from "components/Text";
import Button from "components/Button";

interface modalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainDestinationModal = ({ setModalOpen }: modalProps) => {
  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.imgContainer}>
        <img src="https://www.myro.co.kr/myro_image/city/jeju.jpg" />
      </div>
      <div className={styles.contContainer}>
        <div className={styles.contTextTitle}>JEJU</div>
        <Text value="대한민국 제주도" type="groupTitle" />
        <div className={styles.contTextContents}>
          <Text
            value="섬 전체가 하나의 거대한 관광자원인 제주도. 
            에메랄드빛 물빛이 인상적인 협재 해수욕장은 제주 대표 여행지며, 
            파도가 넘보는 주상절리와 바다 위 산책로인 용머리 해안은 제주에서만 
            볼 수 있는 천혜의 자연경관으로 손꼽힌다. 드라마 촬영지로 알려진 섭지코스는 
            꾸준한 사랑을 받고 있으며 한라봉과 흑돼지, 은갈치 등은 제주를 대표하는 음식이다."
            type="text"
            color="lightgray"
          />
        </div>
        <Button width="20%" text="일정 만들기" />
      </div>
      <div className={styles.closeBtn} onClick={() => setModalOpen(false)}>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <line fill="none" stroke="#999" strokeWidth="1.4" x1="1" y1="1" x2="19" y2="19"></line>
          <line fill="none" stroke="#999" strokeWidth="1.4" x1="19" y1="1" x2="1" y2="19"></line>
        </svg>
      </div>
    </div>
  );
};

export default MainDestinationModal;
