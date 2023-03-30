import Modal from "@mui/material/Modal";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../Main.module.css";
import MainTravelLogItem from "./MainTravelLogItem";

interface ModalTravelLogModalProps {
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MainTravelLogModal = ({ open, setModalOpen }: ModalTravelLogModalProps) => {
  return (
    <Modal open={open} onClose={() => setModalOpen(false)}>
      <div className={styles.logModalContainer}>
        <MainTravelLogItem />
      </div>
    </Modal>
  );
};

export default MainTravelLogModal;
