import React, { useEffect } from "react";
import styles from "./Edit.module.css";
import { useAppSelector } from "app/hooks";
import { selectScheduleList } from "slices/scheduleEditSlice";

const { kakao } = window;

const EditMap = () => {
  const scheduleList = useAppSelector(selectScheduleList);
  let latitude = 0;
  let longitude = 0;

  const setMapCenter = () => {
    let cnt = 0;
    scheduleList.map((val, key) => {
      scheduleList[key].map((value, idx) => {
        latitude += value.location.latitude;
        longitude += value.location.longitude;
        cnt++;
      });
    });
    latitude /= cnt;
    longitude /= cnt;
  };

  const createMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 8,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
  };

  useEffect(() => {
    setMapCenter();
    createMap();
  }, []);

  return <div id="map" className={styles.editMap}></div>;
};

export default EditMap;
