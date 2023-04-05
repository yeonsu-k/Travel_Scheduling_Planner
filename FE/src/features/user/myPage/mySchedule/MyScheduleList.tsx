import React, { useEffect, useState } from "react";
import MyScheduleListItem from "./MyScheduleListItem";
import styles from "./MySchedule.module.css";
import Axios from "api/JsonAxios";
import api from "api/Api";
import Loading from "components/Loading";
import { setScheduleCnt } from "slices/mainSlice";
import { useDispatch } from "react-redux";

export interface MyScheduleConfig {
  schedule_id: number;
  host: string;
  region_name: string;
  schedule_name: string;
  start_day: string;
  end_day: string;
  mine: boolean;
  private: boolean;
  modifiedTime: string;
  regionId: number;
  locationCount: number;
}

const MyScheduleList = () => {
  const dispatch = useDispatch();
  const [mySchedule, setMySchedule] = useState<MyScheduleConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMySchedule = async () => {
    setLoading(true);
    await Axios.get(api.user.getScheduleList())
      .then((res) => {
        setMySchedule(res.data.data);
        dispatch(setScheduleCnt({ scheduleCnt: res.data.data.length }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMySchedule();
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <div className={styles.myScheduleContainer}>
        {mySchedule.map((item: MyScheduleConfig, i: number) => (
          <MyScheduleListItem key={i} {...item} />
        ))}
      </div>
    </>
  );
};

export default MyScheduleList;
