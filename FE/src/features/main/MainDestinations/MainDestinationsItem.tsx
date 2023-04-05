import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { DestinationConfig } from "slices/mainSlice";
import MainDestinationModal from "./MainDestinationModal";
import styles from "../Main.module.css";

const MainDestinationItem = (item: DestinationConfig) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const { regionName, regionImageURL, englishName } = item;
  const showModal = () => {
    setModalOpen(true);
  };

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
          <MainDestinationModal item={item} setModalOpen={setModalOpen} />
        </Modal>
      ) : null}
    </div>
  );
};

export default MainDestinationItem;
