import React from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import EditScheduleItem from "./EditScheduleItem";
import { useAppSelector } from "app/hooks";
import { selectScheduleList } from "slices/scheduleEditSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";
import colorPalette from "styles/colorPalette";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSearchParams } from "react-router-dom";

interface EditDayScheduleListProps {
  day: number;
}

const EditDayScheduleList = ({ day }: EditDayScheduleListProps) => {
  const scheduleList = useAppSelector(selectScheduleList);
  const placeNumber = scheduleList[day - 1].length;
  // const [timePicker, setTimePicker] = useState(false);

  // 일정 권한 확인
  const [searchParams] = useSearchParams();
  const isMine = searchParams.get("mine");

  let color;
  switch (day) {
    case 1:
      color = colorPalette.day_1;
      break;
    case 2:
      color = colorPalette.day_2;
      break;
    case 3:
      color = colorPalette.day_3;
      break;
    case 4:
      color = colorPalette.day_4;
      break;
    case 5:
      color = colorPalette.day_5;
      break;
    case 6:
      color = colorPalette.day_6;
      break;
    case 7:
      color = colorPalette.day_7;
      break;
    case 8:
      color = colorPalette.day_8;
      break;
    case 9:
      color = colorPalette.day_9;
      break;
    case 10:
      color = colorPalette.day_10;
      break;
  }

  return (
    <div className={styles.editDayScheduleList}>
      <Text value={`${day}DAY 2월 23일 목`} en />
      <div style={{ margin: "1vh" }}></div>
      {isMine == "true" ? (
        <Text value="일차를 누르면 일정 전체 변경이 가능합니다." type="smallText" color="lightgray" />
      ) : null}
      <div style={{ margin: "1.5vh" }}></div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.dayColor} style={{ backgroundColor: color }}></div> &nbsp;&nbsp;
        <Text value={`${placeNumber} places`} />
      </div>

      <div style={{ margin: "1.5vh" }}></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Text value="시작" type="caption"></Text>
        <div style={{ width: "6.5rem", display: "flex", justifyContent: "center" }}>
          <Text value="오전 10:00" type="caption" color="yellow" bold />
        </div>

        <div style={{ cursor: "pointer" }}>
          <AccessTimeIcon fontSize="small" />
        </div>
      </div>

      <hr style={{ backgroundColor: "#c5c5c5", height: "1px", border: "0", width: "95%" }} />

      <Droppable droppableId={`${day}`} key={`${day}`}>
        {(provided) => (
          <div
            className={`${day}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              width: "100%",
              minHeight: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {scheduleList[day - 1].map((value, key) => (
              <div key={value.location.locationName} style={{ width: "90%" }}>
                <Draggable
                  isDragDisabled={isMine == "false"}
                  key={parseInt(value.day.toString() + "0" + value.sequence.toString())}
                  draggableId={value.day.toString() + "0" + value.sequence.toString()}
                  index={key}
                >
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{
                        width: "100%",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <EditScheduleItem
                        day={day}
                        index={key}
                        img={value.location.locationURL}
                        placeName={value.location.locationName}
                        time={value.location.time}
                        startTime={value.startTime}
                        endTime={value.endTime}
                      />
                    </div>
                  )}
                </Draggable>
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default EditDayScheduleList;
