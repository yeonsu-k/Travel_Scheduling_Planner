import React, { useEffect, useRef, useState } from "react";
import { selectLocal, selectMarker } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Create.module.css";
import hotelImage from "asset/hotel.png";
import placeImage from "asset/place.png";
import pointImage from "asset/point.png";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function CreateMap() {
  const local = useAppSelector(selectLocal);
  const marker = useAppSelector(selectMarker);
  const mainMap = useRef<HTMLInputElement>(null);
  const [markerListSize, setMarkerListSize] = useState(marker.length);
  const geocoder = new kakao.maps.services.Geocoder();
  const [centerPos, setCenterPos] = useState(() => {
    geocoder.addressSearch(local, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        return { center: new kakao.maps.LatLng(result[0].y, result[0].x), level: 8 };
      }
    });
    return { center: new kakao.maps.LatLng(33.450701, 126.570667), level: 8 };
  });

  useEffect(() => {
    geocoder.addressSearch(local, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        setCenterPos({ center: new kakao.maps.LatLng(result[0].y, result[0].x), level: 8 });
      }
    });
  }, [local]);

  useEffect(() => {
    // 마커 리스트에서 가장 마지막 위치를 기준으로 중심 좌표 바꿔주기
    if (marker.length != 0 && marker.length >= markerListSize) {
      const centerData = marker[marker.length - 1].info;
      setCenterPos({ center: new kakao.maps.LatLng(centerData.latitude, centerData.longitude), level: 4 });
      setMarkerListSize(marker.length);
    }
  }, [marker]);

  useEffect(() => {
    if (mainMap.current) {
      mainMap.current.innerHTML = "";
      setMap();
    }
  }, [centerPos, marker]);

  function setMap() {
    const container = document.getElementById("map");
    const options = centerPos;
    // 지도를 생성
    const map = new kakao.maps.Map(container, options);

    const imageSize = new kakao.maps.Size(30, 30);
    const image = {
      hotel: new kakao.maps.MarkerImage(hotelImage, imageSize),
      place: new kakao.maps.MarkerImage(placeImage, imageSize),
      point: new kakao.maps.MarkerImage(pointImage, imageSize),
    };

    marker
      .filter((arr, index, callback) => index === callback.findIndex((val) => val.info.id === arr.info.id))
      .map((value) => {
        const { info, type } = value;
        new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(info.latitude, info.longitude), // 마커를 표시할 위치
          title: info.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: type == "hotel" ? image.hotel : type == "place" ? image.place : image.point, // 마커 이미지
        });
      });
  }

  return <div id="map" ref={mainMap} className={`${styles.Container} ${styles.map}`} />;
}

export default CreateMap;
