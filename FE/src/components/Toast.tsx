import React, { useEffect } from "react";
import { Snackbar, styled, Zoom } from "@mui/material";

interface Props {
  message: string;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackbarStyle = styled(Snackbar)(() => ({
  "&.MuiSnackbar-root": {
    margin: "0",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    zIndex: "100",
  },
  ".MuiPaper-root": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
  },
  ".MuiSnackbarContent-root": {
    fontFamily: "Pretendard-Regular",
    fontSize: "0.95rem",
    transition: "none",
    padding: "32px 64px",
  },
}));

function Toast({ message, open, onClose }: Props) {
  const timer = setTimeout(() => onClose(false), 2000);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <>
      {open && (
        <SnackbarStyle
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          TransitionComponent={Zoom}
          message={message}
        />
      )}
    </>
  );
}

Toast.defaultProps = {
  message: "문구를 써주세요. 3초뒤에 사라집니다.",
  open: false,
};

export default Toast;
