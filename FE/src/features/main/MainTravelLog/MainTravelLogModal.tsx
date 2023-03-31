import Modal from "@mui/material/Modal";
import Text from "components/Text";
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
        <div className={styles.logModalTitle}>
          <Text value="장소 목록" type="groupTitle" />
        </div>
        <div className={styles.logModalInfoCont}>
          {/* <div className={styles.logModalInfo}>
            <div className={styles.logInfoImg}>
              <img src="https://www.myro.co.kr/myro_image/travelog/blog_001.jpg" />
            </div>
          </div> */}
          <div className={styles.logModalItemCont}>
            <MainTravelLogItem />
            <MainTravelLogItem />
            <MainTravelLogItem />
            <MainTravelLogItem />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MainTravelLogModal;
