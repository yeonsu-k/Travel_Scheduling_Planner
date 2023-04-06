import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { basicConfig, selectMarker, selectRegion } from "slices/scheduleCreateSlice";
import SearchCardInfoModal from "./search/SearchCardInfoModal";
import { useAppSelector } from "app/hooks";
import styles from "./Create.module.css";
import hotelImage from "asset/markerHotel.png";
import placeImage from "asset/markerPlace.png";
import pointImage from "asset/markerPoint.png";
import Modal from "@mui/material/Modal";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function CreateMap() {
  const region = useAppSelector(selectRegion);
  const marker = useAppSelector(selectMarker);
  const mainMap = useRef<HTMLInputElement>(null);
  const [markerListSize, setMarkerListSize] = useState(marker.length);
  const geocoder = new kakao.maps.services.Geocoder();
  const [centerPos, setCenterPos] = useState<{ y: number; x: number }>(() => {
    geocoder.addressSearch(region.name, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        return { y: result[0].y, x: result[0].x };
      }
    });
    return { y: 33.450701, x: 126.570667 };
  });
  const [ModalOpen, setModalOpen] = useState(false);
  const [markerInfo, setMarkerInfo] = useState<basicConfig>();

  useEffect(() => {
    geocoder.addressSearch(region.name, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        setCenterPos({ y: result[0].y, x: result[0].x });
      }
    });
  }, [region]);

  useEffect(() => {
    // 마커 리스트에서 가장 마지막 위치를 기준으로 중심 좌표 바꿔주기
    if (marker.length != 0 && marker.length >= markerListSize) {
      const centerData = marker[marker.length - 1].info;
      setCenterPos({ y: centerData.latitude, x: centerData.longitude });
      setMarkerListSize(marker.length);
    }
  }, [marker]);

  useLayoutEffect(() => {
    if (mainMap.current) {
      mainMap.current.innerHTML = "";
      setMap();
    }
  }, [centerPos, marker]);

  function setMap() {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(centerPos.y, centerPos.x), level: 7 };
    // 지도를 생성
    const map = new kakao.maps.Map(container, options);
    map.setMinLevel(5);
    map.setMaxLevel(8);

    const imageSize = new kakao.maps.Size(30, 30);
    const imageOption = { offset: new kakao.maps.Point(30, 30) };
    const image = {
      hotel: new kakao.maps.MarkerImage(hotelImage, imageSize, imageOption),
      place: new kakao.maps.MarkerImage(placeImage, imageSize, imageOption),
      point: new kakao.maps.MarkerImage(pointImage, imageSize, imageOption),
    };

    const markers = marker
      .filter(
        (arr, index, callback) => index === callback.findIndex((val) => val.info.locationId === arr.info.locationId),
      )
      .map((value) => {
        const { info, type } = value;
        const oneMarker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(info.latitude, info.longitude), // 마커를 표시할 위치
          title: info.locationName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: type == "hotel" ? image.hotel : type == "place" ? image.place : image.point, // 마커 이미지
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
        });
        kakao.maps.event.addListener(oneMarker, "click", function () {
          setMarkerInfo(info);
          setModalOpen(true);
          const bounds = new kakao.maps.LatLngBounds();
          bounds.extend(new kakao.maps.LatLng(info.latitude, info.longitude));
          map.setBounds(bounds);
        });
      });

    const infowindow = marker
      .filter(
        (arr, index, callback) => index === callback.findIndex((val) => val.info.locationId === arr.info.locationId),
      )
      .map((value) => {
        const { info } = value;
        new kakao.maps.InfoWindow({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(info.latitude, info.longitude), // 마커를 표시할 위치
          content: infoWindowElement(info.locationName),
        });
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
      eleParent.style.border = "0px";
      eleParent.style.height = "0px";
    });
  }

  const cssInfoText =
    "display: block; font-size:0.8rem; font-weight:600; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; color: black; text-align: center; border-radius: 4px; padding: 0px 10px; top:3px;";
  const infoWindowElement = (name: string) => {
    const element = document.createElement("span");
    element.className = "infoStyle";
    element.textContent = name;
    element.style.cssText = cssInfoText;
    return element;
  };

  return (
    <>
      <div id="map" ref={mainMap} className={`${styles.Container} ${styles.map}`} />
      {ModalOpen && markerInfo != undefined && (
        <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
          <SearchCardInfoModal place={markerInfo} setModalOpen={() => setModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default CreateMap;
