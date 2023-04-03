import React from "react";
import styles from "../Edit.module.css";
import Text from "components/Text";
import EditScheduleItem from "./EditScheduleItem";
import { useAppSelector } from "app/hooks";
import { selectFullScheduleList } from "slices/scheduleEditSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";
import colorPalette from "styles/colorPalette";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface EditDayScheduleListProps {
  day: number;
}

const EditDayScheduleList = ({ day }: EditDayScheduleListProps) => {
  const fullScheduleList = useAppSelector(selectFullScheduleList);
  const placeNumber = fullScheduleList[day - 1].dayList.length;
  // const [timePicker, setTimePicker] = useState(false);

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
      <Text value="일차를 누르면 일정 전체 변경이 가능합니다." type="smallText" color="lightgray" />
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
            {fullScheduleList[day - 1].dayList.map((value, key) => (
              <div key={value.name} style={{ width: "90%" }}>
                <Draggable key={value.id} draggableId={value.id.toString()} index={key}>
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
                        img={value.image}
                        placeName={value.name}
                        time={value.time}
                        // startTime={value.startTime}
                        // endTime={value.endTime}
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
