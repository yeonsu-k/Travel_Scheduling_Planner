import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { basicConfig } from "slices/scheduleCreateSlice";
import Modal from "@mui/material/Modal";
import SearchCardInfoModal from "../create/search/SearchCardInfoModal";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [markerInfo, setMarkerInfo] = useState<basicConfig>({
    locationId: 0,
    locationName: "",
    locationURL: "",
    address: "",
    latitude: 0,
    longitude: 0,
    time: "",
  });

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

  const updateMap = () => {
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

    const moveLocation = new kakao.maps.LatLng(latitude, longitude);
    map.panTo(moveLocation);
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
          const imageSize = new kakao.maps.Size(27, 27);
          const imageOption = { offset: new kakao.maps.Point(13, 20) };
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          const marker = new kakao.maps.Marker({
            map: map,
            position: position.latlng,
            title: position.title,
            image: markerImage,
            clickable: true,
          });

          const customMarker = new kakao.maps.CustomOverlay({
            map: map,
            position: point,
            content: markerNumElement(idx + 1),
            yAnchor: 1,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            setMarkerInfo(value.location);
            setModalOpen(true);
            // const bounds = new kakao.maps.LatLngBounds();
            // bounds.extend(new kakao.maps.LatLng(value.location.latitude, value.location.longitude));
            // map.setBounds(bounds);
          });
          new kakao.maps.InfoWindow({
            map: map,
            position: new kakao.maps.LatLng(value.location.latitude, value.location.longitude),
            content: infoWindowElement(value.location.locationName),
          });

          const infoTitle = Array.from(document.querySelectorAll<HTMLElement>("span.infoStyle"));
          infoTitle.forEach((e) => {
            const w = e.offsetWidth + 10;
            const ml = w / 2 + 15;
            const ele = e.parentElement as HTMLElement;
            const elePre = ele.previousSibling as HTMLElement;
            const eleParent = ele.parentElement as HTMLElement;
            ele.style.top = "-12px";
            ele.style.left = "50%";
            ele.style.marginLeft = -ml + "px";
            ele.style.width = w + "px";
            elePre.style.display = "none";
            eleParent.remove();
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
        const imageOption = { offset: new kakao.maps.Point(-20, 5) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          map: map,
          position: position.latlng,
          title: position.title,
          image: markerImage,
        });

        const customMarker = new kakao.maps.CustomOverlay({
          map: map,
          position: point,
          content: markerNumElement(idx + 1),
          yAnchor: 1,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          setMarkerInfo(value.location);
          setModalOpen(true);
          // const bounds = new kakao.maps.LatLngBounds();
          // bounds.extend(new kakao.maps.LatLng(value.location.latitude, value.location.longitude));
          // map.setBounds(bounds);
        });
        new kakao.maps.InfoWindow({
          map: map,
          position: new kakao.maps.LatLng(value.location.latitude, value.location.longitude),
          content: infoWindowElement(value.location.locationName),
        });

        const infoTitle = Array.from(document.querySelectorAll<HTMLElement>("span.infoStyle"));
        infoTitle.forEach((e) => {
          const w = e.offsetWidth + 10;
          const ml = w / 2 + 15;
          const ele = e.parentElement as HTMLElement;
          const elePre = ele.previousSibling as HTMLElement;
          const eleParent = ele.parentElement as HTMLElement;
          ele.style.top = "-50px";
          ele.style.left = "50%";
          ele.style.marginLeft = -ml + "px";
          ele.style.width = w + "px";
          elePre.style.display = "none";
          eleParent.remove();
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

  const markerNumCSS =
    "display: flex; justify-content: center; align-items: center; color: #ffffff; font-size: 0.8rem;";
  const markerNumElement = (num: number) => {
    const content = document.createElement("div");
    content.className = "markerNum";
    content.textContent = num.toString();
    content.style.cssText = markerNumCSS;
    return content;
  };

  const cssInfoText =
    "display: block; font-size:0.8rem; font-weight:600; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; color: black; text-align: center; border-radius: 4px; padding: 0px 10px; top:3px;";
  const infoWindowElement = (name: string) => {
    const element = document.createElement("span");
    element.className = "infoStyle";
    element.textContent = name;
    element.style.cssText = cssInfoText;
    return element;
  };

  useEffect(() => {
    createMap();
    setMarker();
  }, [day]);

  useEffect(() => {
    // updateMap();
    setMarker();
    console.log("변경");
  }, []);

  // useEffect(() => {
  //   createMap();
  // }, []);

  // useLayoutEffect(() => {
  //   createMap();
  //   setMarker();
  // }, []);

  return (
    <>
      <div id="map" className={styles.editMap}></div>
      {modalOpen ? (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <SearchCardInfoModal place={markerInfo} setModalOpen={() => setModalOpen(false)} />
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditMap;

EditMap.defaultProps = {
  day: 0,
};
