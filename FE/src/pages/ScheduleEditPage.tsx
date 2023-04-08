import React, { useEffect, useRef, useState } from "react";
import styles from "features/schedule/edit/Edit.module.css";
import { useAppSelector } from "app/hooks";
import EditDayList from "features/schedule/edit/EditDayList";
import EditFullScheduleList from "features/schedule/edit/fullList/EditFullScheduleList";
import Text from "components/Text";
import { useDispatch } from "react-redux";
import { selectKeepPlaceList, selectScheduleList, setKeepPlaceList, setscheduleList } from "slices/scheduleEditSlice";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import KeepScheduleItem from "features/schedule/edit/KeepScheduleItem";
import { selectDate, selectRegion, selectVehicle } from "slices/scheduleCreateSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PlaceAddModal from "features/schedule/create/buttons/PlaceAddModal";
import CreateSearch from "features/schedule/create/CreateSearch";
import CloseIcon from "@mui/icons-material/Close";
import EditDayMoveList from "features/schedule/edit/dayList/EditDayMoveList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import colorPalette from "styles/colorPalette";
import Modal from "components/Modal";
import Input from "components/Input";
import SwitchButton from "components/SwitchButton";
import ButtonStyled from "components/Button";
import EditMap from "features/schedule/edit/EditMap";

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 13,
  },
}));

interface sendScheduleListProps {
  locationId: number;
  day: number;
  sequence: number;
  startTime: string;
  endTime: string;
}

const ScheduleEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const region = useAppSelector(selectRegion);
  const vehicle = useAppSelector(selectVehicle);
  const date = useAppSelector(selectDate);
  const keepPlaceList = useAppSelector(selectKeepPlaceList);
  const [addPlaceModal, setAddPlaceModal] = useState(false);
  const [viewSearchBar, setViewSearchBar] = useState(false);
  const [currentTab, setCurrentTab] = useState("호텔");
  const [hotelCurrentDay, setHotelCurrentDay] = useState(0);
  const [placeCurrentDay, setPlaceCurrentDay] = useState(-1);
  const [viewDaySchedule, setViewDaySchedule] = useState(false);
  const [day, setDay] = useState(0);
  const scheduleList = useAppSelector(selectScheduleList);

  // 포함되지 않은 장소
  const containerRef = useRef<any>(null); // 드래그 할 영역 네모 박스 Ref
  const dragComponentRef = useRef<HTMLDivElement>(null); //움직일 드래그 박스 Ref
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0 }); // 드래그 전 포지션 값 (e.target.offset의 상대 위치)
  const [clientPosition, setClientPosition] = useState({ x: 0, y: 0 }); // 실시간 커서 위치인 e.client를 갱신하는 값
  const [position, setPosition] = useState({ left: 20, top: 100 }); //실제 드래그 할 요소가 위치하는 포지션 값

  const [modalOpen, setModalOpen] = useState<boolean>(false); // 확인 모달
  const [scheduleTitle, setScheduleTitle] = useState<string>(""); // 일정 이름
  const [scheduleOpen, setScheduleOpen] = useState<boolean>(true); // 일정 공개 여부

  // 일정 권한 확인
  const [searchParams] = useSearchParams();
  const isMine = searchParams.get("mine");
  const scheduleId = searchParams.get("id");

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

    const copyList = scheduleList.map((value) => value.slice());
    const keepList = [...keepPlaceList];

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

      const dragContent = copyList[dragStartDay - 1][dragStartIndex].location;
      copyList[dragStartDay - 1].splice(dragStartIndex, 1);
      if (keepList.length === 0) {
        keepList.push(dragContent);
      } else {
        keepList.splice(dragEndIndex, 0, dragContent);
      }

      dispatch(setscheduleList([...copyList]));
      dispatch(setKeepPlaceList([...keepList]));
    }
    // 보관함에서 일정으로 옮기는 경우
    else if (source.droppableId === "keepPlaceList") {
      const dragStartIndex = source.index;

      const dragEndDay = Number(destination.droppableId);
      const dragEndIndex = destination.index;

      const dragContent = {
        location: keepList[dragStartIndex],
        day: dragEndDay,
        sequence: 0,
        startTime: "10:00",
        endTime: "10:00",
        duration: 0,
      };
      console.log(dragContent);
      keepList.splice(dragStartIndex, 1);
      copyList[dragEndDay - 1].splice(dragEndIndex, 0, dragContent);
      dispatch(setscheduleList([...copyList]));
      dispatch(setKeepPlaceList([...keepList]));
    } //일정 내에서 순서만 바꾸는 경우
    else {
      const dragStartDay = Number(source.droppableId);
      const dragStartIndex = source.index;

      const dragEndDay = Number(destination.droppableId);
      const dragEndIndex = destination.index;

      const dragContent = copyList[dragStartDay - 1][dragStartIndex];
      copyList[dragStartDay - 1].splice(dragStartIndex, 1);
      copyList[dragEndDay - 1].splice(dragEndIndex, 0, dragContent);
      dispatch(setscheduleList([...copyList]));
    }
  };

  const onClickSaveSchedule = () => {
    const sendScheduleList: sendScheduleListProps[] = [];

    scheduleList.map((val, key) => {
      scheduleList[key].map((value, index) => {
        const scheduleItem = {
          locationId: value.location.locationId,
          day: key + 1,
          sequence: index + 1,
          startTime: value.startTime,
          endTime: value.endTime,
        };

        sendScheduleList.push(scheduleItem);
      });
    });

    if (scheduleId !== null) {
      const sendData = {
        scheduleId: scheduleId,
        scheduleRegion: region.name,
        scheduleName: scheduleTitle,
        isPrivate: scheduleOpen,
        scheduleStartDay: date.start,
        scheduleEndDay: date.end,
        scheduleStartLocation: null,
        scheduleEndLocation: null,
        vehicle: vehicle,
        scheduleLocationRequest: sendScheduleList,
      };

      Axios.put(api.createSchedule.schedule(), sendData)
        .then((res) => {
          console.log("일정 수정 ", res);
          navigate("/mypage");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const sendData = {
        regionId: region.id,
        scheduleName: scheduleTitle,
        isPrivate: scheduleOpen,
        scheduleStartDay: date.start,
        scheduleEndDay: date.end,
        scheduleStartLocation: null,
        scheduleEndLocation: null,
        vehicle: vehicle,
        scheduleLocationRequestList: sendScheduleList,
      };

      Axios.post(api.createSchedule.schedule(), sendData)
        .then((res) => {
          console.log(res);
          navigate("/mypage");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // getSchedule();
    console.log("일정 불러오기", scheduleList);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <EditDayList setDay={setDay} setViewDaySchedule={setViewDaySchedule} />

      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {viewDaySchedule ? <EditDayMoveList day={day} /> : <EditFullScheduleList />}

        <div className={styles.map} ref={containerRef}>
          {viewDaySchedule ? <EditMap day={day} /> : <EditMap />}

          {isMine == "true" || isMine == null ? (
            <a className={styles.saveScheduleBtn} onClick={() => setModalOpen(true)}>
              일정저장
            </a>
          ) : null}

          {viewDaySchedule ? (
            <>
              <div className={styles.daySummary}>
                <div>
                  <Text value={day.toString()} type="title" en></Text>
                  <Text value="일차" type="caption" en />
                </div>

                <div style={{ color: colorPalette.yellow }}>
                  <LocationOnIcon fontSize="small" />
                  <Text value={scheduleList[day - 1].length.toString()} color="yellow" type="textTitle"></Text>
                  <Text value="개의 장소" type="caption" en />
                </div>
              </div>
            </>
          ) : isMine == "true" || isMine == null ? (
            <>
              <TooltipStyled title="장소를 검색하여 일정에 추가" placement="left">
                <div className={styles.searchPlaceBtn} onClick={() => setViewSearchBar(true)}>
                  <SearchIcon />
                </div>
              </TooltipStyled>
              {viewSearchBar && (
                <div className={styles.searchList}>
                  <div style={{ float: "right", cursor: "pointer" }} onClick={() => setViewSearchBar(false)}>
                    <CloseIcon fontSize="medium" />
                  </div>

                  <CreateSearch
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    hotelCurrentDay={hotelCurrentDay}
                    setHotelCurrentDay={setHotelCurrentDay}
                    placeCurrentDay={placeCurrentDay}
                    setPlaceCurrentDay={setPlaceCurrentDay}
                  />
                </div>
              )}

              <TooltipStyled title="장소를 등록하여 일정에 추가" placement="left">
                <div className={styles.addPlaceBtn} onClick={() => setAddPlaceModal(true)}>
                  <AddLocationAltIcon />
                </div>
              </TooltipStyled>
              {addPlaceModal && <PlaceAddModal setAddPlaceModal={setAddPlaceModal} />}
            </>
          ) : null}

          {isMine == "true" || isMine == null ? (
            <>
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
                        <Draggable key={value.locationId} draggableId={value.locationId?.toString()} index={key}>
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
                              <KeepScheduleItem
                                img={value.locationURL}
                                placeName={value.locationName}
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
            </>
          ) : null}
        </div>
      </DragDropContext>

      {/* 확인 모달 */}
      {modalOpen ? (
        <Modal title="일정 저장" modalClose={() => setModalOpen(false)}>
          <div className={styles.scheduleTitleContainer}>
            <div className={styles.scheduleTitle}>
              <Text value="일정 이름" type="text" color="darkgray" />
              <Input placeholder="일정 이름을 입력해주세요." onChange={(e) => setScheduleTitle(e.target.value)} />
            </div>
            <div className={styles.scheduleTitle}>
              <Text value="일정 공개" type="text" color="darkgray" />
              <SwitchButton label="" checked={scheduleOpen} onChange={() => setScheduleOpen(!scheduleOpen)} />
            </div>
            <div
              className={styles.scheduleConfirmBtn}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <ButtonStyled text="저장" color="main" onClick={() => onClickSaveSchedule()} />
              <ButtonStyled text="취소" onClick={() => setModalOpen(false)} />
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default ScheduleEditPage;
