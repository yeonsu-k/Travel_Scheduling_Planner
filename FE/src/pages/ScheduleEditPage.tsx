import React, { useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import EditDayList from "features/schedule/edit/EditDayList";
import { Grid } from "@mui/material";
import EditFullScheduleList from "features/schedule/edit/EditFullScheduleList";

const { kakao } = window;

const ScheduleEditPage = () => {
  const { place } = useAppSelector((state: rootState) => state.map);

  const setMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };

    // 지도 생성
    const map = new kakao.maps.Map(container, options);
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(place, (result: any[], status: string) => {
      // 정상적으로 검색이 완료되면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  };

  useEffect(() => {
    setMap();
  }, [place]);

  console.log(location.pathname);

  return (
    <>
      <Grid container columns={10} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={0.3}>
          <EditDayList />
        </Grid>
        <Grid item xs={2}>
          <EditFullScheduleList />
        </Grid>
        <Grid item xs={7.7}>
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </Grid>
      </Grid>
    </>
  );
};

export default ScheduleEditPage;
