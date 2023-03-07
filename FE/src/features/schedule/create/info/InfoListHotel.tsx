import React, { useEffect } from "react";
import { basicConfig, selectDate, selectHotelList, setHotelList } from "slices/scheduleCreateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./Info.module.css";
import Text from "components/Text";
import { Box } from "@mui/material";
import { addDays, differenceInDays, format } from "date-fns";
import { Close } from "@mui/icons-material";

function InfoListHotel() {
  const dispatch = useAppDispatch();
  const hotel = useAppSelector(selectHotelList);
  const date = useAppSelector(selectDate);
  const [currentDay, setCurrentDay] = React.useState(0);
  const [hotelDays, setHotelDays] = React.useState<(basicConfig | null)[]>([]);

  const size = differenceInDays(new Date(date.end), new Date(date.start)) + 1;
  useEffect(() => {
    setHotelDays([...hotel]);
  }, [hotel]);

  const deleteHotel = (id: number | undefined) => {
    const index = hotelDays.findIndex((hotelDays) => hotelDays?.id === id);
    setCurrentDay(index);
    const copy = [...hotelDays];
    copy[index] = null;
    setHotelDays(copy);
    dispatch(setHotelList(copy));
  };

  const deleteHotelAll = () => {
    setCurrentDay(0);
    setHotelDays([]);
    dispatch(setHotelList([]));
  };

  const rendering = () => {
    const result = [];
    for (let index = 0; index < size; index++) {
      result.push(
        <Box className={styles.flex} mb={1} key={index}>
          <button
            className={currentDay === index ? `${styles.days_btn} ${styles.days_focused}` : `${styles.days_btn}`}
            onClick={() => setCurrentDay(index)}
          >
            DAY{index + 1}
            &nbsp;&nbsp;
            <small>
              {format(addDays(new Date(date.start), index), "MM.dd")}-{" "}
              {format(addDays(new Date(date.start), index + 1), "MM.dd")}
            </small>
          </button>
          <div className={styles.cardList}>
            <div className={styles.card}>
              {hotelDays[index] ? (
                <>
                  <img src={hotelDays[index]?.image} />
                  <div>
                    <span className={styles.cardText}>
                      {hotelDays[index]?.name}
                      <br />
                      <small>Maison Glad Jeju</small>
                    </span>
                    <div className={styles.cardDelete}>
                      <button onClick={() => deleteHotel(hotelDays[index]?.id)}>
                        <Close fontSize="small" color="error" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Box my={0.5}>
                    <p className={styles.explain}>일자 버튼을 누르고 호텔을 추가하세요.</p>
                  </Box>
                </>
              )}
            </div>
          </div>
        </Box>,
      );
    }
    return result;
  };

  return (
    <>
      <div className={styles.flex}>
        <Box my={2.5}>
          <Text
            value={hotelDays.filter((element) => null != element).length.toString()}
            type="textTitle"
            color="yellow"
            en
          />
        </Box>
        <button onClick={deleteHotelAll} className={`${styles.btn} ${styles.delete_btn}`}>
          호텔전체삭제
        </button>
        <Box my={0.5}>
          <p className={styles.explain}>숙소는 일정의 시작 지점과 종료 지점으로 설정됩니다.</p>
        </Box>
        {rendering()}
      </div>
    </>
  );
}

export default InfoListHotel;
