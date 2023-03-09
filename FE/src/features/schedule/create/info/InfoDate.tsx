import React, { useEffect, useState } from "react";
import styles from "./Info.module.css";
import Modal from "components/Modal";
import { Stack } from "@mui/system";
import Text from "components/Text";
import InfoCalendar from "./InfoCalendar";
import { Box } from "@mui/material";
import colorPalette from "styles/colorPalette";
import { differenceInDays } from "date-fns";
import { selectDate } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";

function InfoDate() {
  const date = useAppSelector(selectDate);
  const [ModalOpen, setModalOpen] = useState(true);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={styles.content}>
      <Stack alignItems="center" spacing={3}>
        <Text
          value={differenceInDays(new Date(date.end), new Date(date.start)) + 1 + " DAY"}
          type="textTitle"
          en
          bold
        />
        <span className={styles.periodDate} onClick={showModal}>
          {date.start.toString()} ~ {date.end.toString()}
        </span>
      </Stack>
      {ModalOpen && (
        <Modal title="여행 날짜 선택" modalClose={() => setModalOpen(false)}>
          <Stack direction="row" alignItems="center" spacing={1} width="100%" mb={1}>
            <Box className={styles.rule_box} sx={{ background: colorPalette.main }} />
            <Text value="*최대 10일까지 가능" type="caption" en />
          </Stack>
          <InfoCalendar modalClose={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default InfoDate;
