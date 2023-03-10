import React from "react";

interface ImageMapType {
  address: string;
  setAddressSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function ImageMap({ address, setAddressSearch }: ImageMapType) {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function (result: any[], status: string) {
    if (status === kakao.maps.services.Status.OK) {
      if (result.length > 0) {
        setAddressSearch(true);
        const markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        const container = document.getElementById("ImgMap"), // 이미지 지도를 표시할 div
          staticMapOption = {
            center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
            level: 5, // 이미지 지도의 확대 레벨
            marker: marker, // 이미지 지도에 표시할 마커
          };
        const map = new kakao.maps.StaticMap(container, staticMapOption);
      }
    }
  });

  return <div id="ImgMap" style={{ width: "100%", height: "100%" }} />;
}

export default ImageMap;
