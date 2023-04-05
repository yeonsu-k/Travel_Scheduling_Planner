import React from "react";
import createStyles from "features/schedule/create/Create.module.css";
import styles from "./Info.module.css";
import { Stack } from "@mui/system";
import Text from "components/Text";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import InfoListHotel from "./InfoListHotel";
import InfoListPlace from "./InfoListPlace";

function InfoSelectList(props: { scheduleCreatProps: ScheduleCreatPropsType }) {
  const { currentTab, setCurrentTab, setPlaceCurrentDay } = props.scheduleCreatProps;

  const TabArr = [
    {
      name: "호텔",
      content: <InfoListHotel scheduleCreatProps={props.scheduleCreatProps} />,
    },
    {
      name: "장소",
      content: <InfoListPlace scheduleCreatProps={props.scheduleCreatProps} />,
    },
  ];

  return (
    <Stack className={createStyles.mobileDisplayNone} alignItems="center" pt={3} style={{ width: "100%" }}>
      <Text value="선택목록" />
      <div className={createStyles.InfoMenu}>
        <ul>
          {TabArr.map((ele, index) => {
            return (
              <li
                key={index}
                className={currentTab === ele.name ? `${createStyles.focused}` : ""}
                onClick={() => {
                  ele.name === "호텔" ? (setPlaceCurrentDay(-1), setCurrentTab(ele.name)) : setCurrentTab(ele.name);
                }}
              >
                {ele.name}
              </li>
            );
          })}
        </ul>
        <div className={currentTab === "호텔" ? createStyles.lineLeft : createStyles.lineRight} />
      </div>
      {TabArr[currentTab === "호텔" ? 0 : 1].content}
    </Stack>
  );
}

export default InfoSelectList;
