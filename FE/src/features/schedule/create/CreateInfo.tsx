import React from "react";
import styles from "./CreateInfo.module.css";
import InfoLocal from "./info/InfoLocal";
import InfoDate from "./info/InfoDate";
import { Stack } from "@mui/system";
import Text from "components/Text";
import { Box } from "@mui/material";
import InfoListHotel from "./info/InfoListHotel";
import InfoListPlace from "./info/InfoListPlace";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";

function CreateInfo(props: ScheduleCreatPropsType) {
  const { currentTab, setCurrentTab, setPlaceCurrentDay } = props;

  const TabArr = [
    {
      name: "호텔",
      content: <InfoListHotel scheduleCreatProps={props} />,
    },
    {
      name: "장소",
      content: <InfoListPlace scheduleCreatProps={props} />,
    },
  ];

  return (
    <div className={`${styles.Container} ${styles.scroll}`}>
      <Stack pt={2.5} alignItems="center" mr={0.5}>
        <InfoLocal />
        <InfoDate />
        <Box py={3}>
          <Text value="선택목록" />
        </Box>
        <div className={styles.InfoMenu}>
          <ul>
            {TabArr.map((ele, index) => {
              return (
                <li
                  key={index}
                  className={currentTab === ele.name ? `${styles.focused}` : ""}
                  onClick={() => {
                    ele.name === "호텔" ? (setPlaceCurrentDay(-1), setCurrentTab(ele.name)) : setCurrentTab(ele.name);
                  }}
                >
                  {ele.name}
                </li>
              );
            })}
          </ul>
          <div className={currentTab === "호텔" ? styles.lineLeft : styles.lineRight} />
        </div>
        {TabArr[currentTab === "호텔" ? 0 : 1].content}
      </Stack>
    </div>
  );
}

export default CreateInfo;
