import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateInfo from "features/schedule/create/CreateInfo";
import CreateSearch from "features/schedule/create/CreateSearch";
import CreateMap from "features/schedule/create/CreateMap";

export interface ScheduleCreatPropsType {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  hotelCurrentDay: number;
  setHotelCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  placeCurrentDay: number;
  setPlaceCurrentDay: React.Dispatch<React.SetStateAction<number>>;
}

function ScheduleCreatePage() {
  const [currentTab, setCurrentTab] = React.useState("호텔");
  const [hotelCurrentDay, setHotelCurrentDay] = useState(0);
  const [placeCurrentDay, setPlaceCurrentDay] = useState(-1);

  return (
    <>
      <Grid container columns={6.5} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={1.11} ml={0.5}>
          <CreateInfo
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            hotelCurrentDay={hotelCurrentDay}
            setHotelCurrentDay={setHotelCurrentDay}
            placeCurrentDay={placeCurrentDay}
            setPlaceCurrentDay={setPlaceCurrentDay}
          />
        </Grid>
        <Grid item xs={4.3}>
          <CreateMap />
        </Grid>
        <Grid item xs={1.07}>
          <CreateSearch
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            hotelCurrentDay={hotelCurrentDay}
            setHotelCurrentDay={setHotelCurrentDay}
            placeCurrentDay={placeCurrentDay}
            setPlaceCurrentDay={setPlaceCurrentDay}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ScheduleCreatePage;
