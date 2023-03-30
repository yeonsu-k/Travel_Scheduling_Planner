import React from "react";
import { selectRegion } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Info.module.css";
import Modal from "components/Modal";
import { Stack } from "@mui/system";
import InfoLocalSelect from "./InfoLocalSelect";

function InfoLocal() {
  const region = useAppSelector(selectRegion);
  const [ModalOpen, setModalOpen] = React.useState(false);

  return (
    <div className={styles.content}>
      <Stack alignItems="center" onClick={() => setModalOpen(true)} sx={{ cursor: "pointer" }}>
        <span className={styles.localText}>{region.name}</span>
        <span className={styles.localText_en}>Busan</span>
      </Stack>
      {ModalOpen && (
        <Modal title="지역선택" modalClose={() => setModalOpen(false)}>
          <InfoLocalSelect modalClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default InfoLocal;
