import React, { useEffect, useRef, useState } from "react";
import styles from "features/schedule/edit/Edit.module.css";
import { useAppSelector } from "app/hooks";
import EditDayList from "features/schedule/edit/EditDayList";
import EditFullScheduleList from "features/schedule/edit/EditFullScheduleList";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import {
  fullScheduleListConfig,
  placeInfoConfig,
  selectFullScheduleList,
  selectKeepPlaceList,
  setFullScheduleList,
  setKeepPlaceList,
} from "slices/scheduleEditSlice";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import EditScheduleItem from "features/schedule/edit/EditScheduleItem";
import { selectDate, selectPlaceList, selectPointPlace, selectTotalList } from "slices/scheduleCreateSlice";
import { differenceInDays } from "date-fns";

const { kakao } = window;

const ScheduleEditPage = () => {
  const dispatch = useDispatch();

  const date = useAppSelector(selectDate);
  const place = useAppSelector(selectPlaceList);
  const totalList = useAppSelector(selectTotalList);

  // 포함되지 않은 장소
  const containerRef = useRef<any>(null); // 드래그 할 영역 네모 박스 Ref
  const dragComponentRef = useRef<HTMLDivElement>(null); //움직일 드래그 박스 Ref
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 }); // 드래그 전 포지션 값 (e.target.offset의 상대 위치)
  const [clientPosition, setClientPosition] = useState({ x: 0, y: 0 }); // 실시간 커서 위치인 e.client를 갱신하는 값
  const [position, setPosition] = useState({ left: 20, top: 100 }); //실제 드래그 할 요소가 위치하는 포지션 값

  const fullScheduleList = useAppSelector(selectFullScheduleList);
  const keepPlaceList = useAppSelector(selectKeepPlaceList);

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // 리스트 밖으로 drop 되면 destination이 null
    if (!destination) {
      return;
    }
    // 출발지와 도착지가 같으면 할 게없음
    if (destination.droppableId === source.droppableId && source.index === destination.index) {
      return;
    }

    const copyList = JSON.parse(JSON.stringify(fullScheduleList));
    const keepList = JSON.parse(JSON.stringify(keepPlaceList));

    console.log("result", result);

    // 보관함 내에서 순서만 바꾸는 경우
    if (source.droppableId === "keepPlaceList" && destination.droppableId === "keepPlaceList") {
      const dragStartIndex = source.index;
      const dragEndIndex = destination.index;

      const dragContent = keepList[dragStartIndex];
      keepList.splice(dragStartIndex, 1);
      keepList.splice(dragEndIndex, 0, dragContent);
      dispatch(setKeepPlaceList([...keepList]));
    }
    // 보관함에 저장
    else if (destination.droppableId === "keepPlaceList") {
      const dragStartDay = Number(source.droppableId);
      const dragStartIndex = source.index;

      const dragEndIndex = destination.index;

      const dragContent = copyList[dragStartDay - 1].dayList[dragStartIndex];
      copyList[dragStartDay - 1].dayList.splice(dragStartIndex, 1);
      if (keepList.length === 0) {
        keepList.push(dragContent);
      } else {
        keepList.splice(dragEndIndex, 0, dragContent);
      }

      dispatch(setFullScheduleList([...copyList]));
      dispatch(setKeepPlaceList([...keepList]));
    }
    // 보관함에서 일정으로 옮기는 경우
    else if (source.droppableId === "keepPlaceList") {
      const dragStartIndex = source.index;

      const dragEndDay = Number(destination.droppableId);
      const dragEndIndex = destination.index;

      const dragContent = keepList[dragStartIndex];
      console.log(dragContent);
      keepList.splice(dragStartIndex, 1);
      copyList[dragEndDay - 1].dayList.splice(dragEndIndex, 0, dragContent);
      dispatch(setFullScheduleList([...copyList]));
      dispatch(setKeepPlaceList([...keepList]));
    } //일정 내에서 순서만 바꾸는 경우
    else {
      const dragStartDay = Number(source.droppableId);
      const dragStartIndex = source.index;

      const dragEndDay = Number(destination.droppableId);
      const dragEndIndex = destination.index;

      const dragContent = copyList[dragStartDay - 1].dayList[dragStartIndex];
      copyList[dragStartDay - 1].dayList.splice(dragStartIndex, 1);
      copyList[dragEndDay - 1].dayList.splice(dragEndIndex, 0, dragContent);
      dispatch(setFullScheduleList([...copyList]));
    }
  };

  const getSchedule = () => {
    console.log("일정 생성 데이터 불러오기");

    const list: fullScheduleListConfig[] = [];

    const travelDays = differenceInDays(new Date(date.end), new Date(date.start)) + 1;
    for (let day = 1; day <= travelDays; day++) {
      list.push({
        day: day,
        dayList: [],
      });
    }

    const dayPlaceCount = Math.floor(totalList.length / travelDays);

    console.log("dayPlaceCount: ", dayPlaceCount);

    let placeInfo: placeInfoConfig = {
      id: 0,
      image: "",
      name: "",
      address: "",
      latitude: 0,
      longitude: 0,
      time: "",
    };

    let day = 0;
    let dayPlace = 0;
    totalList.map((value, key) => {
      placeInfo = {
        id: value.info.id,
        image: value.info.image,
        name: value.info.name,
        address: value.info.address,
        latitude: value.info.latitude,
        longitude: value.info.longitude,
        time: value.time,
      };

      list[day].dayList.push(placeInfo);
      dayPlace++;
      console.log("dayPlace: ", dayPlace);
      if (dayPlace === dayPlaceCount && day < travelDays - 1) {
        day++;
        dayPlace = 0;
        console.log("day: ", day);
      }
    });

    console.log("list: ", list);
    console.log(totalList);

    dispatch(setFullScheduleList([...list]));
  };

  useEffect(() => {
    setMap();
  }, [place]);

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <EditDayList />

      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <EditFullScheduleList />

        <div className={styles.map} ref={containerRef}>
          <div id="map" style={{ width: "100%", height: "100%", zIndex: "0" }}></div>

          <a className={styles.saveScheduleBtn}>일정저장</a>

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
            <div style={{ color: "#AAAAAA", fontSize: "0.7rem", margin: "0.5rem 0 1.5rem", lineHeight: "150%" }}>
              일정에서 누락된 장소들이 이곳에 포함됩니다. <br />
              일정에 포함된 장소를 옮겨 놓을 수도 있습니다. <br />
              원하는 위치에 드래그하여 일정에 포함시키세요. <br />
            </div>
            <Droppable droppableId="keepPlaceList" key="keepPlaceList">
              {(provided) => (
                <div
                  className="keepPlaceList"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ width: "auto", minHeight: "10px" }}
                >
                  {keepPlaceList.map((value, key) => (
                    <Draggable key={value.id} draggableId={value.id?.toString()} index={key}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableProps.style,
                            width: "auto",
                            height: "auto",
                          }}
                        >
                          <EditScheduleItem
                            img={value.image}
                            placeName={value.name}
                            time={value.time}
                            // startTime={value.startTime}
                            // endTime={value.endTime}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ScheduleEditPage;
