import React, { useEffect } from "react";
import styles from "./Edit.module.css";
import { useAppSelector } from "app/hooks";
import { selectScheduleList } from "slices/scheduleEditSlice";
import colorPalette from "styles/colorPalette";
import day1Marker from "asset/mapMarker/day1Marker.svg";
import day2Marker from "asset/mapMarker/day2Marker.svg";
import day3Marker from "asset/mapMarker/day3Marker.svg";
import day4Marker from "asset/mapMarker/day4Marker.svg";
import day5Marker from "asset/mapMarker/day5Marker.svg";
import day6Marker from "asset/mapMarker/day6Marker.svg";
import day7Marker from "asset/mapMarker/day7Marker.svg";
import day8Marker from "asset/mapMarker/day8Marker.svg";
import day9Marker from "asset/mapMarker/day9Marker.svg";
import day10Marker from "asset/mapMarker/day10Marker.svg";

const { kakao } = window;

interface EditMapProps {
  day: number;
}

const EditMap = ({ day }: EditMapProps) => {
  const scheduleList = useAppSelector(selectScheduleList);
  let map: any;
  let latitude = 0;
  let longitude = 0;
  const markerImg = [
    day1Marker,
    day2Marker,
    day3Marker,
    day4Marker,
    day5Marker,
    day6Marker,
    day7Marker,
    day8Marker,
    day9Marker,
    day10Marker,
  ];

  const checkMarkerColor = (day: number): string => {
    switch (day) {
      case 1:
        return colorPalette.day_1;
      case 2:
        return colorPalette.day_2;
      case 3:
        return colorPalette.day_3;
      case 4:
        return colorPalette.day_4;
      case 5:
        return colorPalette.day_5;
      case 6:
        return colorPalette.day_6;
      case 7:
        return colorPalette.day_7;
      case 8:
        return colorPalette.day_8;
      case 9:
        return colorPalette.day_9;
      case 10:
        return colorPalette.day_10;
    }
    return "";
  };

  const createMap = () => {
    let cnt = 0;

    if (day === 0) {
      scheduleList.map((val, key) => {
        scheduleList[key].map((value, idx) => {
          latitude += value.location.latitude;
          longitude += value.location.longitude;

          cnt++;
        });
      });

      latitude /= cnt;
      longitude /= cnt;
    } else {
      scheduleList[day - 1].map((value, idx) => {
        latitude += value.location.latitude;
        longitude += value.location.longitude;

        cnt++;
      });

      latitude /= cnt;
      longitude /= cnt;
    }

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 8,
    };

    map = new kakao.maps.Map(mapContainer, mapOption);
  };

  const setMarker = () => {
    let linePath: any[] = [];

    if (day === 0) {
      scheduleList.map((val, key) => {
        scheduleList[key].map((value, idx) => {
          const position = {
            title: value.location.locationName,
            latlng: new kakao.maps.LatLng(value.location.latitude, value.location.longitude),
          };
          const point = new kakao.maps.LatLng(value.location.latitude, value.location.longitude);

          const imageSrc = markerImg[key];
          const imageSize = new kakao.maps.Size(25, 25);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          const marker = new kakao.maps.Marker({
            map: map,
            position: position.latlng,
            title: position.title,
            image: markerImage,
          });

          linePath.push(point);
        });

        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 3,
          strokeColor: checkMarkerColor(key + 1),
          strokeOpacity: 1,
          strokeStyle: "solid",
        });
        polyline.setMap(map);
        linePath = [];
      });
    } else {
      scheduleList[day - 1].map((value, idx) => {
        const position = {
          title: value.location.locationName,
          latlng: new kakao.maps.LatLng(value.location.latitude, value.location.longitude),
        };
        const point = new kakao.maps.LatLng(value.location.latitude, value.location.longitude);

        const imageSrc = markerImg[day - 1];
        const imageSize = new kakao.maps.Size(25, 25);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          map: map,
          position: position.latlng,
          title: position.title,
          image: markerImage,
        });

        linePath.push(point);
      });

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 3,
        strokeColor: checkMarkerColor(day),
        strokeOpacity: 1,
        strokeStyle: "solid",
      });
      polyline.setMap(map);
      linePath = [];
    }
  };

  useEffect(() => {
    createMap();
    setMarker();
  }, [day]);

  return <div id="map" className={styles.editMap}></div>;
};

export default EditMap;

EditMap.defaultProps = {
  day: 0,
};
