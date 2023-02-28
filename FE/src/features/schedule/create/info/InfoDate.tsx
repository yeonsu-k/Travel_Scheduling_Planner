import React, { useEffect } from "react";
import styles from "./Info.module.css";
import Modal from "components/Modal";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { Stack } from "@mui/system";
import Text from "components/Text";
import InfoCalendar from "./InfoCalendar";
import { Box } from "@mui/material";
import colorPalette from "styles/colorPalette";
import { differenceInDays } from "date-fns";

function InfoDate() {
  const { date } = useSelector((state: rootState) => state.map);
  const [ModalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    setModalOpen(false);
  }, [date]);

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
          <InfoCalendar />
        </Modal>
      )}
    </div>
  );
}

export default InfoDate;
