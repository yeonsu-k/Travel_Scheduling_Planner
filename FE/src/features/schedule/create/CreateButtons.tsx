import { DirectionsCar, DirectionsSubway } from "@mui/icons-material";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React, { useState } from "react";
import styles from "./Create.module.css";
import { styled } from "@mui/material/styles";
import ButtonsAddModal from "./buttons/ButtonsAddModal";
import ButtonsCreateModal from "./buttons/ButtonsCreateModal";

interface ScheduleCreatPropsType {
  currentMove: string;
  setCurrentMove: React.Dispatch<React.SetStateAction<string>>;
  scheduleCreateClick: () => void;
}

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 13,
  },
}));

function CreateButtons(props: ScheduleCreatPropsType) {
  const { currentMove, setCurrentMove, scheduleCreateClick } = props;
  const [createScheduleModal, setCreateScheduleModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);

  const MoveArr = [
    {
      name: "car",
      toolTip: "대중교통",
      icon: <DirectionsCar />,
    },
    {
      name: "bus",
      toolTip: "자동차",
      icon: <DirectionsSubway />,
    },
  ];

  return (
    <div className={`${styles.multibtndiv}`}>
      {MoveArr.map((ele, index) => {
        return (
          <TooltipStyled title={`이동수단:${ele.toolTip}`} placement="right" key={index}>
            <a
              className={currentMove === ele.name ? `${styles.floatBtn} ${styles.floatBtn_On}` : `${styles.floatBtn}`}
              onClick={() => setCurrentMove(ele.name)}
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
      {addPlaceModal && <ButtonsAddModal setAddPlaceModal={setAddPlaceModal} />}
      {createScheduleModal && (
        <ButtonsCreateModal scheduleCreateClick={scheduleCreateClick} setCreateScheduleModal={setCreateScheduleModal} />
      )}
    </div>
  );
}

export default CreateButtons;
