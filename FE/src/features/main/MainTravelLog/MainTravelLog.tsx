import React, { useEffect, useState } from "react";
import styles from "../Main.module.css";
import MainCarousel from "../Components/MainCarousel";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { TravelLogConfig, locationConfig, setTravelLogList } from "slices/mainSlice";
import { useDispatch } from "react-redux";
import Loading from "components/Loading";

export interface LogConfig {
  title: string;
  src: string;
  author: string;
}

const MainTravelLog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const getTravelLog = async () => {
    await Axios.get(api.createSchedule.getTravels())
      .then((res) => {
        setLoading(true);
        const response = res.data.data;
        let tmpTravelLog: TravelLogConfig[] = [];
        response.map(async (item: TravelLogConfig, i: number) => {
          await Axios.get(api.createSchedule.getRegion(item.regionId))
            .then((res) => {
              console.log(response);
              const scheduleLocations = item.scheduleLocations;
              const tmpSchedule: any[] = [];
              scheduleLocations.map((schedule: locationConfig) => {
                const locations = {
                  address: schedule.location.address,
                  locationName: schedule.location.locationName,
                };
                tmpSchedule.push(locations);
              });
              const tmpTravelLogItem: TravelLogConfig = {
                hostEmail: item.hostEmail,
                scheduleLocations: tmpSchedule,
                scheduleName: item.scheduleName,
                logImg: `https://source.unsplash.com/random/?korea,${res.data.data.englishName}${i}`,
                regionId: item.regionId,
                regionEng: res.data.data.englishName,
              };
              tmpTravelLog = [...tmpTravelLog, tmpTravelLogItem];
            })
            .catch((err: any) => {
              console.log(err);
            });
          dispatch(setTravelLogList({ travelLogList: tmpTravelLog }));
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTravelLog();
  }, []);

  return (
    <div id={styles.travelLog}>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>여행기</div>
        <div className={styles.mainSubTitleText}>TRAVELOG</div>
      </div>
      {loading ? <Loading /> : null}
      <MainCarousel type="log" />
    </div>
  );
};

export default MainTravelLog;
