import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./Info.module.css";
import Text from "components/Text";
import { rootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { addDays, differenceInDays, format } from "date-fns";
import { Close } from "@mui/icons-material";
import { mapActions } from "slices/mapSlice";

interface hotelConfig {
  id: number;
  image: string;
  name: string;
}

function InfoListHotel() {
  const dispatch = useDispatch();
  const { hotel } = useSelector((state: rootState) => state.map);
  const { date } = useSelector((state: rootState) => state.map);
  const [currentDay, setCurrentDay] = React.useState(0);
  const [hotelDays, setHotelDays] = React.useState<(hotelConfig | null)[]>([]);

  const size = differenceInDays(new Date(date.end), new Date(date.start)) + 1;
  useEffect(() => {
    setHotelDays(hotel);
    if (hotel.length <= 0) {
      for (let i = 0; i < size; i++) {
        setHotelDays((hotelDays) => [
          ...hotelDays,
          {
            id: i,
            image: i.toString(),
            name: "메종 글래드 제주" + i,
          },
        ]);
      }
    }
  }, []);

  const deleteHotel = (index: number) => {
    setCurrentDay(index);
    hotelDays[index] = null;
    setHotelDays([...hotelDays]);
    dispatch(mapActions.setHotelList({ hotel: hotelDays }));
  };

  const rendering = () => {
    const result = [];
    for (let index = 0; index < hotelDays.length; index++) {
      result.push(
        <>
          <Box className={styles.flex} mb={1}>
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
                    <img src="" alt={hotelDays[index]?.image} />
                    <div>
                      <span className={styles.cardText}>
                        {hotelDays[index]?.name}
                        <br />
                        <small>Maison Glad Jeju</small>
                      </span>
                      <div className={styles.cardDelete}>
                        <button onClick={() => deleteHotel(index)}>
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
          </Box>
        </>,
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
        <button className={`${styles.btn} ${styles.delete_btn}`}>호텔전체삭제</button>
        <Box my={0.5}>
          <p className={styles.explain}>숙소는 일정의 시작 지점과 종료 지점으로 설정됩니다.</p>
        </Box>
        {rendering()}
      </div>
    </>
  );
}

export default InfoListHotel;
