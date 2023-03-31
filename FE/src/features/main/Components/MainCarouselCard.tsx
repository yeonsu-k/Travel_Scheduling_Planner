import React, { forwardRef, useEffect, useState } from "react";
import { DestinationConfig, TravelLogConfig } from "slices/mainSlice";
import styles from "../Main.module.css";
import MainTravelLog, { LogConfig } from "../MainTravelLog/MainTravelLog";
import MainTravelLogModal from "../MainTravelLog/MainTravelLogModal";
import { Modal } from "@mui/material";
import MainDestinationModal from "../MainDestinations/MainDestinationModal";

interface CarouselCardProps {
  type: string;
  item?: DestinationConfig;
  travelLog?: TravelLogConfig;
}

const MainCarouselCard = ({ type, item, travelLog }: CarouselCardProps) => {
  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  const [destiModalOpen, setDestiModalOpen] = useState<boolean>(false);

  const Bar = forwardRef((props: any, ref: any) => (
    <span {...props} ref={ref}>
      {props.children}
    </span>
  ));
  Bar.displayName = "Bar";

  return (
    <>
      <div className={styles.carouselCardContainer}>
        {type == "log" ? (
          <div style={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}>
            <div className={styles.carouselCard}>
              <img src={travelLog?.logImg} />
            </div>
            <div className={styles.carouselTextLog}>
              <p>{travelLog?.scheduleName}</p>
              <span>by {travelLog?.hostEmail}</span>
            </div>
          </div>
        ) : (
          <div style={{ cursor: "pointer" }} onClick={() => setDestiModalOpen(true)}>
            <div className={styles.carouselCard}>
              <img src={item?.regionImageURL} />
            </div>
            <div className={styles.carouselText}>
              <p>{item?.englishName}</p>
              <span>대한민국 {item?.regionName}</span>
            </div>
          </div>
        )}
      </div>
      {ModalOpen ? <MainTravelLogModal open={ModalOpen} setModalOpen={setModalOpen} travelLog={travelLog} /> : null}
      {destiModalOpen && item ? (
        <Modal open={destiModalOpen} onClose={() => setDestiModalOpen(false)}>
          <Bar>
            <MainDestinationModal item={item} setModalOpen={setDestiModalOpen} />
          </Bar>
        </Modal>
      ) : null}
    </>
  );
};

export default MainCarouselCard;
