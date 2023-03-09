import React from "react";
import { selectDate, selectHotelList, setHotelList } from "slices/scheduleCreateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./Info.module.css";
import Text from "components/Text";
import { Box } from "@mui/material";
import { addDays, differenceInDays, format } from "date-fns";
import { Close } from "@mui/icons-material";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";

function InfoListHotel(props: { scheduleCreatProps: ScheduleCreatPropsType }) {
  const dispatch = useAppDispatch();
  const hotel = useAppSelector(selectHotelList);
  const date = useAppSelector(selectDate);
  const { hotelCurrentDay, setHotelCurrentDay } = props.scheduleCreatProps;

  const deleteHotel = (id: number) => {
    const hotelList = [...hotel];
    const changedIdx = hotelList.findIndex((hotelList) => hotelList?.id === id);
    hotelList[changedIdx] = null;
    dispatch(setHotelList(hotelList));
  };

  const deleteHotelAll = () => {
    setHotelCurrentDay(0);
    const size = differenceInDays(new Date(date.end), new Date(date.start));
    dispatch(setHotelList(Array.from({ length: size }, () => null)));
  };

  return (
    <div className={styles.flex}>
      <Box my={2.5}>
        <Text value={hotel.filter((element) => null != element).length.toString()} type="textTitle" color="yellow" en />
      </Box>
      <button className={`${styles.btn} ${styles.delete_btn}`} onClick={deleteHotelAll}>
        호텔전체삭제
      </button>
      <Box my={0.5}>
        <p className={styles.explain}>숙소는 일정의 시작 지점과 종료 지점으로 설정됩니다.</p>
      </Box>
      <>
        {hotel.map((hotelCard, index) => (
          <Box className={styles.flex} mb={1} key={index}>
            <button
              className={hotelCurrentDay === index ? `${styles.days_btn} ${styles.days_focused}` : `${styles.days_btn}`}
              onClick={() => setHotelCurrentDay(index)}
            >
              DAY{index + 1}
              &nbsp;&nbsp;
              <small>
                {format(addDays(new Date(date.start), index), "MM.dd")}
                {" - "}
                {format(addDays(new Date(date.start), index + 1), "MM.dd")}
              </small>
            </button>
            <div className={styles.cardList}>
              <div className={styles.card}>
                {hotelCard != null ? (
                  <>
                    <img src={hotelCard.image} />
                    <div>
                      <span className={styles.cardText}>
                        {hotelCard.name}
                        <br />
                        <small>Maison Glad Jeju</small>
                      </span>
                      <div className={styles.cardDelete}>
                        <button onClick={() => deleteHotel(hotelCard.id)}>
                          <Close fontSize="small" color="error" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Box my={0.5}>
                      <div onClick={() => setHotelCurrentDay(index)} style={{ cursor: "pointer" }}>
                        <p className={styles.explain}>일자 버튼을 누르고 호텔을 추가하세요.</p>
                      </div>
                    </Box>
                  </>
                )}
              </div>
            </div>
          </Box>
        ))}
      </>
    </div>
  );
}

export default InfoListHotel;
