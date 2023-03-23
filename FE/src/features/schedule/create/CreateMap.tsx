import React, { useEffect, useRef } from "react";
import { selectLocal, selectMarker } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";
import styles from "./Create.module.css";

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

  useEffect(() => {
    if (mainMap.current) {
      mainMap.current.innerHTML = "";
      setMap();
    }
  }, [local]);

  function setMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 8,
    };
    // 지도를 생성
    const map = new kakao.maps.Map(container, options);
    // map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(local, function (result: any[], status: string) {
      // 정상적으로 검색이 완료됐으면

      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }

  return <div id="map" ref={mainMap} className={`${styles.Container} ${styles.map}`} />;
}

export default CreateMap;
