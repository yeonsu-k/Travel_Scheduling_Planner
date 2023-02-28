import React, { useEffect, useRef, useState } from "react";
import styles from "features/schedule/edit/Edit.module.css";
import { useAppSelector } from "app/hooks";
import { rootState } from "app/store";
import EditDayList from "features/schedule/edit/EditDayList";
import { Grid } from "@mui/material";
import EditFullScheduleList from "features/schedule/edit/EditFullScheduleList";
import Text from "components/Text";

const { kakao } = window;

const ScheduleEditPage = () => {
  const { place } = useAppSelector((state: rootState) => state.map);

  // 포함되지 않은 장소
  const containerRef = useRef<any>(null); // 드래그 할 영역 네모 박스 Ref
  const dragComponentRef = useRef<HTMLDivElement>(null); //움직일 드래그 박스 Ref
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 }); // 드래그 전 포지션 값 (e.target.offset의 상대 위치)
  const [clientPosition, setClientPosition] = useState({ x: 0, y: 0 }); // 실시간 커서 위치인 e.client를 갱신하는 값
  const [position, setPosition] = useState({ left: 50, top: 50 }); //실제 드래그 할 요소가 위치하는 포지션 값

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

  const dragStartHandler = (e: any) => {
    // 고스트 이미지를 제거하기 위해 투명 캔버스 생성
    const blankCanvas = document.createElement("canvas");
    blankCanvas.classList.add("canvas");
    e.dataTransfer?.setDragImage(blankCanvas, 0, 0);
    document.body?.appendChild(blankCanvas); // 투명 캔버스를 생성하여 글로벌 아이콘 제거
    e.dataTransfer.effectAllowed = "move"; // 크롬의 그린 + 아이콘 제거
    const tempOriginPosition = { ...originPosition };
    tempOriginPosition["x"] = e.target.offsetLeft;
    tempOriginPosition["y"] = e.target.offsetTop;
    setOriginPosition(tempOriginPosition); // 드래그 시작할 때 드래그 전 위치값을 저장

    const tempClientPosition = { ...clientPosition };
    tempClientPosition["x"] = e.clientX;
    tempClientPosition["y"] = e.clientY;
    setClientPosition(tempClientPosition);
  };

  const dragHandler = (e: any) => {
    const tempPosition = { ...position };
    tempPosition["left"] = e.target.offsetLeft + e.clientX - clientPosition.x;
    tempPosition["top"] = e.target.offsetTop + e.clientY - clientPosition.y;
    setPosition(tempPosition);

    const tempClientPosition = { ...clientPosition };
    tempClientPosition["x"] = e.clientX;
    tempClientPosition["y"] = e.clientY;
    setClientPosition(tempClientPosition);
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault(); // 드래그 시에 플라잉백하는 고스트 이미지를 제거
  };

  const dragEndHandler = (e: any) => {
    const isDragArea = (e: any) => {
      if (
        position.left < 0 ||
        position.top < 0 ||
        position.left > containerRef.current?.offsetWidth ||
        position.top > containerRef.current.offsetHeight
      ) {
        return false;
      }

      return true;
    };
    if (!isDragArea(e)) {
      const tempPosition = { ...position };
      tempPosition["left"] = originPosition.x;
      tempPosition["top"] = originPosition.y;
      setPosition(tempPosition);
    }

    // 캔버스 제거
    const canvases = document.getElementsByClassName("canvas");
    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }

    // 캔버스로 인해 발생한 스크롤 방지 attribute 제거
    document.body.removeAttribute("style");
  };

  useEffect(() => {
    setMap();
  }, [place]);

  return (
    <>
      <Grid container columns={10} style={{ width: "100%", height: "100%" }}>
        <Grid item xs={0.3}>
          <EditDayList />
        </Grid>
        <Grid item xs={2}>
          <EditFullScheduleList />
        </Grid>
        <Grid item className={styles.map} ref={containerRef} xs={7.7}>
          <div id="map" style={{ width: "100%", height: "100%", zIndex: "0" }}></div>
          <div
            className={styles.keepPlaces}
            ref={dragComponentRef}
            draggable
            onDragStart={(e) => dragStartHandler(e)}
            onDrag={(e) => dragHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            style={{ left: position.left, top: position.top }}
          >
            <Text value="포함되지 않은 장소" bold /> <br />
            <div style={{ color: "#AAAAAA", fontSize: "0.7rem", margin: "0.5rem 0 0.5rem", lineHeight: "150%" }}>
              일정에서 누락된 장소들이 이곳에 포함됩니다. <br />
              일정에 포함된 장소를 옮겨 놓을 수도 있습니다. <br />
              원하는 위치에 드래그하여 일정에 포함시키세요. <br />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ScheduleEditPage;
