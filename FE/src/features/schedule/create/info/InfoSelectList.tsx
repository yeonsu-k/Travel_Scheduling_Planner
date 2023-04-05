import React from "react";
import createStyles from "features/schedule/create/Create.module.css";
import { Stack } from "@mui/system";
import Text from "components/Text";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import InfoListHotel from "./InfoListHotel";
import InfoListPlace from "./InfoListPlace";

function InfoSelectList(props: { scheduleCreatProps: ScheduleCreatPropsType }) {
  const { currentTab, setCurrentTab, setPlaceCurrentDay, mobilePlaceListOpen } = props.scheduleCreatProps;

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
    <Stack className={createStyles.marginZero} alignItems="center" mt={3} bgcolor="white" width="100%" height="100%">
      {!mobilePlaceListOpen && <Text value="선택목록" />}
      <div className={`${createStyles.InfoMenu} ${createStyles.marginZero}`}>
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
