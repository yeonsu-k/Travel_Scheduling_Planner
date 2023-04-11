import React, { ReactNode } from "react";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Text from "./Text";
import styles from "./css/Modal.module.css";

interface Props {
  title: string;
  modalClose?: () => void;
  children?: ReactNode;
}

function Modal({ title, modalClose, children }: Props) {
  return (
    <div className={styles.background}>
      <div className={styles.inDiv}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Text value={title} bold />
            <IconButton size="small" onClick={modalClose} disableRipple>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          <Stack justifyContent="center" alignItems="center" width="100%" height="100%">
            {children}
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: "제목",
  children: <div>TEST</div>,
};

export default Modal;
