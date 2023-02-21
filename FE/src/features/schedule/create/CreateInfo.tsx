import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import Input from "components/Input";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "slices/mapSlice";
import { rootState } from "app/store";

function CreateInfo() {
  const dispatch = useDispatch();
  const { place } = useSelector((state: rootState) => state.map);
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
    dispatch(mapActions.setPlace({ place: testPlace }));
    setModalOpen(false);
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "Azure" }}>
      <span onClick={showModal}>{place}</span>
      {ModalOpen && (
        <Modal title="지역선택" modalClose={() => setModalOpen(false)}>
          <Input placeholder="주소를 입력해주세요" onChange={(e) => choicePlace(e)} />
          <Button text="확인" color="main" radius onClick={savePlace} />
        </Modal>
      )}
    </div>
  );
}

export default CreateInfo;
