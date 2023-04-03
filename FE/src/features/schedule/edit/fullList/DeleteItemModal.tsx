import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import { Box, Stack } from "@mui/material";

interface ButtonsDeleteModalType {
  onClickDeleteItem: () => void;
  setDeleteItemModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteItemModal = (props: ButtonsDeleteModalType) => {
  const { onClickDeleteItem, setDeleteItemModal } = props;

  return (
    <Modal title="" modalClose={() => setDeleteItemModal(false)}>
      <Stack width="400px">
        <Box pb={3}>
          <p>정말 삭제하시겠습니까?</p>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Button text="확인" color="main" radius width="30%" onClick={onClickDeleteItem} />
          <Button text="취소" color="black" radius width="30%" onClick={() => setDeleteItemModal(false)} />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default DeleteItemModal;
