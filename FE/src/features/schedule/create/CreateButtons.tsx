import { DirectionsCar, DirectionsSubway } from "@mui/icons-material";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React, { useState } from "react";
import styles from "./Create.module.css";
import { styled } from "@mui/material/styles";
import PlaceAddModal from "./buttons/PlaceAddModal";
import CreateScheduleModal from "./buttons/CreateScheduleModal";
import { useAppSelector } from "app/hooks";
import { selectVehicle, setVehicle } from "slices/scheduleCreateSlice";
import { useDispatch } from "react-redux";

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 13,
  },
}));

function CreateButtons(props: { scheduleCreateClick: () => void }) {
  const dispatch = useDispatch();
  const vehicle = useAppSelector(selectVehicle);
  const { scheduleCreateClick } = props;
  const [createScheduleModal, setCreateScheduleModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);

  const MoveArr = [
    {
      name: "car",
      toolTip: "자동차",
      icon: <DirectionsCar />,
    },
    {
      name: "bus",
      toolTip: "대중교통",
      icon: <DirectionsSubway />,
    },
  ];

  return (
    <div className={`${styles.multibtndiv}`}>
      {MoveArr.map((ele, index) => {
        return (
          <TooltipStyled title={`이동수단:${ele.toolTip}`} placement="right" key={index}>
            <a
              className={vehicle === ele.name ? `${styles.floatBtn} ${styles.floatBtn_On}` : `${styles.floatBtn}`}
              onClick={() => dispatch(setVehicle(ele.name))}
            >
              {ele.icon}
            </a>
          </TooltipStyled>
        );
      })}
      <a className={styles.floatBtn} onClick={() => setAddPlaceModal(true)}>
        장소등록
      </a>
      <a className={styles.floatBtn} onClick={() => setCreateScheduleModal(true)}>
        일정생성
      </a>
      {addPlaceModal && <PlaceAddModal setAddPlaceModal={setAddPlaceModal} />}
      {createScheduleModal && (
        <CreateScheduleModal
          scheduleCreateClick={scheduleCreateClick}
          setCreateScheduleModal={setCreateScheduleModal}
        />
      )}
    </div>
  );
}

export default CreateButtons;
