import React, { useState } from "react";
import { Grid } from "@mui/material";
import CreateInfo from "features/schedule/create/CreateInfo";
import CreateSearch from "features/schedule/create/CreateSearch";
import CreateMap from "features/schedule/create/CreateMap";
import CreateButtons from "features/schedule/create/CreateButtons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  basicConfig,
  selectHotelList,
  selectPlaceList,
  selectPointPlace,
  setListClear,
} from "slices/scheduleCreateSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { setscheduleList } from "slices/scheduleEditSlice";

export interface ScheduleCreatPropsType {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  hotelCurrentDay: number;
  setHotelCurrentDay: React.Dispatch<React.SetStateAction<number>>;
  placeCurrentDay: number;
  setPlaceCurrentDay: React.Dispatch<React.SetStateAction<number>>;
}

function ScheduleCreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("호텔");
  const [hotelCurrentDay, setHotelCurrentDay] = useState(0);
  const [placeCurrentDay, setPlaceCurrentDay] = useState(-1);
  const hotelList = useAppSelector(selectHotelList) as basicConfig[];
  const placeList = useAppSelector(selectPlaceList) as basicConfig[];
  const pointPlace = useAppSelector(selectPointPlace) as basicConfig[];

  const scheduleCreateClick = async () => {
    await Axios.post(api.createSchedule.setLocation(), {
      hotelList: hotelList,
      placeList: placeList,
      pointPlace: pointPlace,
    }).then((res) => {
      dispatch(setscheduleList(res.data.data));
      dispatch(setListClear());
      navigate("/schedule/edit");
    });
  };

  return (
    <>
      <Grid container columns={6.5} style={{ width: "100%", height: "100%" }}>
        <Grid item xs ml={0.5}>
          <CreateInfo
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            hotelCurrentDay={hotelCurrentDay}
            setHotelCurrentDay={setHotelCurrentDay}
            placeCurrentDay={placeCurrentDay}
            setPlaceCurrentDay={setPlaceCurrentDay}
          />
        </Grid>
        <Grid item xs={4.3} sx={{ position: "relative" }}>
          <CreateButtons scheduleCreateClick={scheduleCreateClick} />
          <CreateMap />
        </Grid>
        <Grid item xs={1}>
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
