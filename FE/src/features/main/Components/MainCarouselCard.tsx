import React, { forwardRef, useEffect, useState } from "react";
import { DestinationConfig } from "slices/mainSlice";
import styles from "../Main.module.css";
import MainTravelLog, { LogConfig } from "../MainTravelLog/MainTravelLog";
import MainTravelLogModal from "../MainTravelLog/MainTravelLogModal";
import { Modal } from "@mui/material";
import MainDestinationModal from "../MainDestinations/MainDestinationModal";

interface CarouselCardProps {
  type: string;
  item?: DestinationConfig;
  info?: LogConfig;
}

const MainCarouselCard = ({ type, item, info }: CarouselCardProps) => {
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
              <img src={info?.src} />
            </div>
            <div className={styles.carouselTextLog}>
              <p>{info?.title}</p>
              <span>by {info?.author}</span>
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
      {ModalOpen ? <MainTravelLogModal open={ModalOpen} setModalOpen={setModalOpen} /> : null}
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
