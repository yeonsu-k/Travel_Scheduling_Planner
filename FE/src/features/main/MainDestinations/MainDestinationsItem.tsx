import Modal from "@mui/material/Modal";
import React, { forwardRef, useEffect, useState } from "react";
import { DestinationConfig } from "slices/mainSlice";
import MainDestinationModal from "./MainDestinationModal";
import styles from "../Main.module.css";

const MainDestinationItem = (item: DestinationConfig) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const { regionName, regionImageURL, englishName } = item;
  const showModal = () => {
    setModalOpen(true);
  };

  const Bar = forwardRef((props: any, ref: any) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));
  Bar.displayName = "Bar";

  return (
    <div className={styles.mainDestinationItem}>
      <div className={styles.card} onClick={showModal}>
        <div className={styles.cardImgContainer}>
          <img src={regionImageURL} />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardEngTitle}>{englishName}</div>
          <div className={styles.cardTitle}>대한민국 {regionName}</div>
        </div>
      </div>
      {ModalOpen ? (
        <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
          <Bar>
            <MainDestinationModal item={item} setModalOpen={setModalOpen} />
          </Bar>
        </Modal>
      ) : null}
    </div>
  );
};

export default MainDestinationItem;
