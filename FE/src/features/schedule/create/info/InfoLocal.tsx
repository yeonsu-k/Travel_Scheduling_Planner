import React from "react";
import styles from "./Info.module.css";
import Modal from "components/Modal";
import Button from "components/Button";
import Input from "components/Input";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "slices/mapSlice";
import { rootState } from "app/store";
import { Stack } from "@mui/system";
import Text from "components/Text";

function InfoLocal() {
  const dispatch = useDispatch();
  const { local } = useSelector((state: rootState) => state.map);
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
    dispatch(mapActions.setLocal({ local: testPlace }));
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
