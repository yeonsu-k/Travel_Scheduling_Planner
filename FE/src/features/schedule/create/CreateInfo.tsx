import React from "react";
import createStyles from "./Create.module.css";
import InfoLocal from "./info/InfoLocal";
import InfoDate from "./info/InfoDate";
import { Stack } from "@mui/system";
import InfoSelectList from "./info/InofoSelectList";
import Modal from "components/Modal";

interface ScheduleCreatPropsType {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  hotelCurrentDay: number;
  setHotelCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  placeCurrentDay: number;
  setPlaceCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  mobilePlaceListOpen: boolean;
  setMobilePlaceListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateInfo(props: ScheduleCreatPropsType) {
  const { mobilePlaceListOpen, setMobilePlaceListOpen } = props;

  return (
    <>
      <div className={`${createStyles.Container} ${createStyles.scroll}`}>
        <Stack className={createStyles.mobileInfoContainer} alignItems="center" mt={2.5} mx={0.5}>
          <InfoLocal />
          <InfoDate />
          <Stack className={createStyles.mobileDisplayNone} width="100%" height="100%">
            <InfoSelectList scheduleCreatProps={props} />
          </Stack>
        </Stack>
        {mobilePlaceListOpen && (
          <Modal title="선택목록" modalClose={() => setMobilePlaceListOpen(false)}>
            <InfoSelectList scheduleCreatProps={props} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreateInfo;
