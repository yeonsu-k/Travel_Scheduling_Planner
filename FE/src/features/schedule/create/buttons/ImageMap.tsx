import React, { useEffect, useLayoutEffect, useRef } from "react";

interface ImageMapType {
  address: string;
  setOpenSeachToast: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchBtnClick: React.Dispatch<React.SetStateAction<boolean>>;
  setAddSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setGps: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
    }>
  >;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function ImageMap(props: ImageMapType) {
  const { address, setSearchBtnClick, setOpenSeachToast, setAddSuccess, setGps } = props;
  const imgMap = useRef<HTMLInputElement>(null);
  function setMap() {
    const container = document.getElementById("ImgMap");
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result: any[], status: string) {
      if (status === kakao.maps.services.Status.OK) {
        setAddSuccess(true);
        const markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
        setGps({
          latitude: result[0].y,
          longitude: result[0].x,
        });

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        const options = {
          center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
          level: 5, // 이미지 지도의 확대 레벨
          marker: marker, // 이미지 지도에 표시할 마커
        };
        const map = new kakao.maps.StaticMap(container, options);
      } else {
        setOpenSeachToast(true);
        setSearchBtnClick(false);
        setAddSuccess(false);
      }
    });
  }

  useLayoutEffect(() => {
    if (imgMap.current) {
      imgMap.current.innerHTML = "";
      setMap();
    }
  }, [address]);

  return (
    <>
      <div id="ImgMap" ref={imgMap} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export default ImageMap;
