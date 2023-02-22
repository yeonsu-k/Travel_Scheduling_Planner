import { Grid } from "@mui/material";
import { rootState } from "app/store";
import CreateInfo from "features/schedule/create/CreateInfo";
import CreateSearch from "features/schedule/create/CreateSearch";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

function MapPage() {
  const { place } = useSelector((state: rootState) => state.map);

  function setMap() {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    // 지도를 생성
    const map = new kakao.maps.Map(container, options);
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(place, function (result: any[], status: string) {
      // 정상적으로 검색이 완료됐으면

      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }

  useEffect(() => {
    setMap();
  }, [place]);

  return (
    <>
      <Grid container columns={6.3} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={1.2}>
          <CreateInfo />
        </Grid>
        <Grid item xs={4}>
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </Grid>
        <Grid item xs={1.1}>
          <CreateSearch />
        </Grid>
      </Grid>
    </>
  );
}

export default MapPage;
