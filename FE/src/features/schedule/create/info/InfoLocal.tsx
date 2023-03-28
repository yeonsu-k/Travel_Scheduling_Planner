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
  const [searchLocal, setSearchLocal] = React.useState({
    id: 1,
    name: "서울",
  });

  const showModal = () => {
    setModalOpen(true);
  };

  const choicePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setSearchLocal({
      id: 1, // 서울만 가능 추후 regionId로 수정
      name: e.target.value,
    });
  };

  const savePlace = () => {
    dispatch(setLocal(searchLocal));
    setModalOpen(false);
  };
  return (
    <div className={styles.content}>
      <Stack alignItems="center" onClick={showModal} sx={{ cursor: "pointer" }}>
        <span className={styles.localText}>{local.name}</span>
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
