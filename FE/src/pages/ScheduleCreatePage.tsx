import React, { useState } from "react";
import CreateInfo from "features/schedule/create/CreateInfo";
import CreateSearch from "features/schedule/create/CreateSearch";
import CreateMap from "features/schedule/create/CreateMap";
import CreateButtons from "features/schedule/create/CreateButtons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "features/schedule/create/Create.module.css";
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
  mobilePlaceListOpen?: boolean;
  setMobilePlaceListOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ScheduleCreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("호텔");
  const [hotelCurrentDay, setHotelCurrentDay] = useState(0);
  const [placeCurrentDay, setPlaceCurrentDay] = useState(-1);
  const [mobilePlaceListOpen, setMobilePlaceListOpen] = useState(false);
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
      <div className={styles.pageContaineGrid}>
        <div>
          <CreateInfo
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            hotelCurrentDay={hotelCurrentDay}
            setHotelCurrentDay={setHotelCurrentDay}
            placeCurrentDay={placeCurrentDay}
            setPlaceCurrentDay={setPlaceCurrentDay}
            mobilePlaceListOpen={mobilePlaceListOpen}
            setMobilePlaceListOpen={setMobilePlaceListOpen}
          />
        </div>
        <div style={{ position: "relative" }}>
          <CreateButtons scheduleCreateClick={scheduleCreateClick} />
          <CreateMap />
          <div className={styles.mobileChoiceBtn} onClick={() => setMobilePlaceListOpen(true)}>
            <a className={styles.floatBtn}>선택목록</a>
          </div>
        </div>
        <div>
          <CreateSearch
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            hotelCurrentDay={hotelCurrentDay}
            setHotelCurrentDay={setHotelCurrentDay}
            placeCurrentDay={placeCurrentDay}
            setPlaceCurrentDay={setPlaceCurrentDay}
          />
        </div>
      </div>
    </>
  );
}

export default ScheduleCreatePage;
