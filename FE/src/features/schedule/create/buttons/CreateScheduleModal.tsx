import React from "react";
import Modal from "components/Modal";
import Button from "components/Button";
import { Box, Stack } from "@mui/material";

interface ButtonsCreateModalType {
  scheduleCreateClick: () => void;
  setCreateScheduleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonsCreateModal(props: ButtonsCreateModalType) {
  const { scheduleCreateClick, setCreateScheduleModal } = props;

  return (
    <Modal title="" modalClose={() => setCreateScheduleModal(false)}>
      <Stack width="400px">
        <Box pb={3}>
          <p>일정을 생성하시겠습니까?</p>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Button text="확인" color="main" radius width="30%" onClick={scheduleCreateClick} />
          <Button text="취소" color="black" radius width="30%" onClick={() => setCreateScheduleModal(false)} />
        </Stack>
      </Stack>
    </Modal>
  );
}

export default ButtonsCreateModal;
