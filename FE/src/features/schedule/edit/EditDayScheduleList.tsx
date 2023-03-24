import React from "react";
import styles from "./Edit.module.css";
import Text from "components/Text";
import EditScheduleItem from "./EditScheduleItem";
import { useAppSelector } from "app/hooks";
import { selectFullScheduleList } from "slices/scheduleEditSlice";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface EditDayScheduleListProps {
  day: number;
}

const EditDayScheduleList = ({ day }: EditDayScheduleListProps) => {
  const fullScheduleList = useAppSelector(selectFullScheduleList);

  return (
    <div className={styles.editDayScheduleList}>
      <Text value={`${day}DAY 2월 23일 목`} en />
      <div style={{ margin: "1vh" }}></div>
      <Text value="일차를 누르면 일정 전체 변경이 가능합니다." type="smallText" />
      <div style={{ margin: "1.5vh" }}></div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={styles.dayColor}></div> &nbsp;&nbsp;
        <Text value="3 places" />
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
