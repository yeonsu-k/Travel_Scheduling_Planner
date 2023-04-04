import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Alert, Snackbar, Zoom, styled } from "@mui/material";

interface NoticeToastProps {
  message: string;
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

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
        <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} TransitionComponent={Zoom}>
          <Alert severity="info" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NoticeToast;
