import React from "react";
import createStyles from "./Create.module.css";
import InfoLocal from "./info/InfoLocal";
import InfoDate from "./info/InfoDate";
import { Stack } from "@mui/system";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import InfoSelectList from "./info/InofoSelectList";

function CreateInfo(props: ScheduleCreatPropsType) {
  return (
    <div className={`${createStyles.Container} ${createStyles.scroll}`}>
      <Stack className={createStyles.mobileInfoContainer} alignItems="center" mt={2.5} mx={0.5}>
        <InfoLocal />
        <InfoDate />
        <InfoSelectList scheduleCreatProps={props} />
      </Stack>
    </div>
  );
}

export default CreateInfo;
