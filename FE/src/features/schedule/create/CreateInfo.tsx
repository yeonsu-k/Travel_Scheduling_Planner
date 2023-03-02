import React from "react";
import styles from "./CreateInfo.module.css";
import InfoLocal from "./info/InfoLocal";
import InfoDate from "./info/InfoDate";
import { Stack } from "@mui/system";
import Text from "components/Text";
import { Box } from "@mui/material";
import InfoListHotel from "./info/InfoListHotel";
import InfoListPlace from "./info/InfoListPlace";

function CreateInfo() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const TabArr = [
    { name: "호텔", content: <InfoListHotel /> },
    { name: "장소", content: <InfoListPlace /> },
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
                  className={currentTab === index ? `${styles.focused}` : ""}
                  onClick={() => setCurrentTab(index)}
                >
                  {ele.name}
                </li>
              );
            })}
          </ul>
          <div className={currentTab === 0 ? styles.lineLeft : styles.lineRight} />
        </div>
        {TabArr[currentTab].content}
      </Stack>
    </div>
  );
}

export default CreateInfo;
