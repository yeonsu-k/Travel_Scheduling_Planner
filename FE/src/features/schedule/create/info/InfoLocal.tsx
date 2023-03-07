import React from "react";
import { selectLocal, setLocal } from "slices/scheduleCreateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./Info.module.css";
import Modal from "components/Modal";
import Button from "components/Button";
import Input from "components/Input";
import { Stack } from "@mui/system";

function InfoLocal() {
  const dispatch = useAppDispatch();
  const local = useAppSelector(selectLocal);
  const [ModalOpen, setModalOpen] = React.useState(false);
  const [testPlace, setPlace] = React.useState("");

  const showModal = () => {
    setModalOpen(true);
  };

  const choicePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setPlace(e.target.value);
  };

  const savePlace = () => {
    dispatch(setLocal(testPlace));
    setModalOpen(false);
  };
  return (
    <div className={styles.content}>
      <Stack alignItems="center" onClick={showModal} sx={{ cursor: "pointer" }}>
        <span className={styles.localText}>{local}</span>
        <span className={styles.localText_en}>Busan</span>
      </Stack>
      {ModalOpen && (
        <Modal title="지역선택" modalClose={() => setModalOpen(false)}>
          <Input placeholder="주소를 입력해주세요" onChange={(e) => choicePlace(e)} />
          <Button text="확인" color="main" radius onClick={savePlace} />
        </Modal>
      )}
    </div>
  );
}

export default InfoLocal;
