import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default Loading;
