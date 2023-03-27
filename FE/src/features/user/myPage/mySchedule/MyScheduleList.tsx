import React, { useEffect, useState } from "react";
import MyScheduleListItem from "./MyScheduleListItem";
import styles from "./MySchedule.module.css";
import Axios from "api/JsonAxios";
import api from "api/Api";

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
}

const MyScheduleList = () => {
  const [mySchedule, setMySchedule] = useState<MyScheduleConfig[]>([]);

  const getMySchedule = async () => {
    await Axios.get(api.user.getScheduleList())
      .then((res) => {
        setMySchedule(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMySchedule();
  }, []);

  return (
    <div className={styles.myScheduleContainer}>
      {mySchedule.map((item: MyScheduleConfig, i: number) => (
        <MyScheduleListItem key={i} {...item} />
      ))}
    </div>
  );
};

export default MyScheduleList;
