import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Snackbar, Zoom, styled } from "@mui/material";

interface NoticeToastProps {
  message: string;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const SnackbarStyle = styled(Snackbar)(() => ({
  "&.MuiSnackbar-root": {
    margin: "0",
    width: "100%",
    height: "100%",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
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

const NoticeToast = ({ message, open, onClose }: NoticeToastProps) => {
  const timer = setTimeout(() => onClose(false), 3000);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <>
      {open && (
        <SnackbarStyle
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          TransitionComponent={Zoom}
          message={message}
        />
      )}
    </>
  );
};

export default NoticeToast;
