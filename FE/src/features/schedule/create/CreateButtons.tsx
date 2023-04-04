import React, { useState } from "react";
import { DirectionsCar, DirectionsSubway } from "@mui/icons-material";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import styles from "./Create.module.css";
import { styled } from "@mui/material/styles";
import PlaceAddModal from "./buttons/PlaceAddModal";
import CreateScheduleModal from "./buttons/CreateScheduleModal";
import { useAppSelector } from "app/hooks";
import {
  selectDate,
  selectHotelList,
  selectPlaceList,
  selectPointPlace,
  selectVehicle,
  setVehicle,
} from "slices/scheduleCreateSlice";
import { differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import Toast from "components/Toast";

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
  const date = useAppSelector(selectDate);
  const hotel = useAppSelector(selectHotelList);
  const place = useAppSelector(selectPlaceList);
  const pointPlace = useAppSelector(selectPointPlace);
  const { scheduleCreateClick } = props;
  const [createScheduleModal, setCreateScheduleModal] = useState(false);
  const [addPlaceModal, setAddPlaceModal] = useState(false);
  const [toastString, setToastString] = useState("");
  const [isToast, setIsToast] = useState(false);

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

  const createScheduleClick = () => {
    const isHotel = !hotel.includes(null);
    const isPlace = place.length >= differenceInDays(new Date(date.end), new Date(date.start)) + 1;
    const isPointPlace = !pointPlace.includes(null);
    if (isHotel && isPlace && isPointPlace) {
      setIsToast(false);
      setCreateScheduleModal(true);
    } else {
      if (!isHotel) setToastString("모든 일자별로 호텔을 선택해야합니다.");
      if (!isPlace) setToastString("여행 일수보다 장소 수가 적습니다.");
      if (!isPointPlace) setToastString("출발과 종착 장소를 담아주세요.");
      setIsToast(true);
    }
  };

  return (
    <>
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
        <a className={styles.floatBtn} onClick={() => createScheduleClick()}>
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
      <Toast message={toastString} open={isToast} onClose={setIsToast} />
    </>
  );
}

export default CreateButtons;
