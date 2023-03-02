import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import MainDestinationModal from "./Components/MainDestinationModal";
import styles from "./Main.module.css";

const MainDestinationItem = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div className={styles.card} onClick={showModal}>
        <div className={styles.cardImgContainer}>
          <img src="https://www.myro.co.kr/myro_image/city/jeju.jpg" />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardEngTitle}>JEJU</div>
          <div className={styles.cardTitle}>대한민국 제주도</div>
        </div>
      </div>
      {ModalOpen ? (
        <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
          <MainDestinationModal setModalOpen={setModalOpen} />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainDestinationItem;
