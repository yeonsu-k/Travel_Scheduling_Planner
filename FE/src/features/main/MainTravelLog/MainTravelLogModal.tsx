import Modal from "@mui/material/Modal";
import Text from "components/Text";
import React, { Dispatch, SetStateAction } from "react";
import styles from "../Main.module.css";
import MainTravelLogItem from "./MainTravelLogItem";
import { TravelLogConfig, locationConfig } from "slices/mainSlice";

interface ModalTravelLogModalProps {
  open: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  travelLog?: TravelLogConfig;
}

const MainTravelLogModal = ({ open, setModalOpen, travelLog }: ModalTravelLogModalProps) => {
  return (
    <Modal open={open} onClose={() => setModalOpen(false)}>
      <div className={styles.logModalContainer}>
        <div className={styles.logModalTitle}>
          <Text value="장소 목록" type="groupTitle" />
        </div>
        <div className={styles.logModalInfoCont}>
          <div className={styles.logInfoImg}>
            <img src={travelLog?.logImg} />
          </div>
          <div className={styles.logModalItemCont}>
            {travelLog?.scheduleLocations.map((location: locationConfig, i: number) => (
              <MainTravelLogItem key={i} location={location} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MainTravelLogModal;
