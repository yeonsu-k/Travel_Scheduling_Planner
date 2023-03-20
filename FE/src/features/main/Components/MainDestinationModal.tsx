import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "../Main.module.css";
import Text from "components/Text";
import Button from "components/Button";
import { DestinationConfig } from "../MainDestinationsList";

interface modalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  item: DestinationConfig;
}

const MainDestinationModal = ({ setModalOpen, item }: modalProps) => {
  const { regionName, regionImageURL, engName, desc } = item;

  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.imgContainer}>
        <img src={regionImageURL} />
      </div>
      <div className={styles.contContainer}>
        <div className={styles.contTextTitle}>{engName}</div>
        <Text value={regionName} type="groupTitle" />
        <div className={styles.contTextContents}>
          <Text value={desc} type="text" color="lightgray" />
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
