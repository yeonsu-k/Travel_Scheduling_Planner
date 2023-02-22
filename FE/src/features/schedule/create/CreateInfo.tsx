import React from "react";
import InfoLocal from "./info/InfoLocal";
import InfoDate from "./info/InfoDate";
import { Stack } from "@mui/system";

function CreateInfo() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Stack pt={3} alignItems="center" spacing={1}>
        <InfoLocal />
        <InfoDate />
      </Stack>
    </div>
  );
}

export default CreateInfo;
