import React, { useEffect } from "react";
import { Box } from "@mui/material";
import styles from "./Info.module.css";
import Text from "components/Text";
import { Close, Timer } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { mapActions } from "slices/mapSlice";

interface placeConfig {
  id: number;
  image: string;
  name: string;
  time: string;
}

function InfoListPlace() {
  const dispatch = useDispatch();
  const { place } = useSelector((state: rootState) => state.map);
  const [placeTimes, setPlaceTimes] = React.useState<(placeConfig | null)[]>([]);
  const [timer, setTimer] = React.useState<
    {
      hour: number;
      minute: number;
    }[]
  >([
    {
      hour: 2,
      minute: 0,
    },
    {
      hour: 1,
      minute: 30,
    },

    {
      hour: 2,
      minute: 30,
    },
  ]);
  const [totalTime, setTotalTime] = React.useState<{
    hour: number;
    minute: number;
  }>();

  useEffect(() => {
    getTotileTime();
    setPlaceTimes([...place]);
  }, []);

  useEffect(() => {
    setPlaceTimes([...place]);
    getTotileTime();
  }, [place]);

  const getTotileTime = () => {
    const hourArr = placeTimes.map((val) => val?.time.split(":")[0]).map((i) => Number(i));
    const minuteArr = placeTimes.map((val) => val?.time.split(":")[1]).map((i) => Number(i));
    const sumHour = hourArr.reduce((accumulator, current) => accumulator + current, 0);
    const sumMinute = minuteArr.reduce((accumulator, current) => accumulator + current, 0);
    setTotalTime({
      hour: sumHour,
      minute: sumMinute,
    });
  };

  const deletePlace = (id: number | undefined) => {
    const newPlaceList = placeTimes.filter((value) => value?.id !== id);
    setPlaceTimes(newPlaceList);
    dispatch(mapActions.setPlaceList({ place: newPlaceList }));
  };

  const deletePlaceAll = () => {
    setPlaceTimes([]);
    dispatch(mapActions.setPlaceList({ place: [] }));
  };

  const onChangeAccount = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const newTime = [...timer];
    if (name === "hour") {
      if (parseInt(value) > 24) {
        newTime[index].hour = 23;
      } else newTime[index].hour = parseInt(value.replace(/^([1-9]|[01][0-9]|2[0-3])$/, value));
    } else if (name === "minute") {
      if (parseInt(value) > 60) {
        newTime[index].minute = 59;
      } else newTime[index].minute = parseInt(value.replace(/^([0-5][0-9])$/, value));
    }
    setTimer(newTime);
  };

  const onBurCheck = (index: number, e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value, name } = e.target;
    if (value == "") {
      const newTime = [...timer];
      if (name === "hour") {
        newTime[index].hour = 1;
      } else if (name === "minute") {
        newTime[index].minute = 30;
      }
      setTimer(newTime);
    }
  };

  return (
    <>
      <div className={styles.flex}>
        <Box my={2.5}>
          <Text
            value={placeTimes.filter((element) => null != element).length.toString()}
            type="textTitle"
            color="yellow"
            en
          />
          <span>
            {" "}
            (총{totalTime?.hour}시간{totalTime?.minute}분)
          </span>
        </Box>

        <button onClick={deletePlaceAll} className={`${styles.btn} ${styles.delete_btn}`}>
          장소전체삭제
        </button>
        {placeTimes.length > 0 ? (
          <>
            <Box my={0.5}>
              <p className={styles.explain}>일자별 여행 시작 장소와 종료 장소 설정할 수 있습니다.</p>
              <span className={styles.explain}>일자별 장소는 숙소 다음 일정으로 시작됩니다.</span>
            </Box>
            {placeTimes.map((placeCard, index) => (
              <div className={styles.cardList} key={index}>
                <div className={styles.card}>
                  <img src={placeCard?.image} alt={""} />
                  <div className={styles.placeCard}>
                    <div className={styles.flexRow}>
                      <span className={styles.cardText}>{placeCard?.name}</span>
                      <span className={`${styles.placeStart}`}>시작일</span>
                    </div>
                    <div className={styles.flexRow}>
                      <div className={styles.placeTimer}>
                        <Timer fontSize="small" />
                        <input
                          name="hour"
                          value={timer[index].hour}
                          id="placeTime"
                          type="number"
                          dir="rtl"
                          min="0"
                          max="23"
                          onBlur={(e) => onBurCheck(index, e)}
                          onChange={(e) => onChangeAccount(index, e)}
                        />
                        시간
                        <input
                          name="minute"
                          value={timer[index].minute}
                          id="placeTime"
                          type="number"
                          dir="rtl"
                          min="0"
                          max="59"
                          onBlur={(e) => onBurCheck(index, e)}
                          onChange={(e) => onChangeAccount(index, e)}
                        />
                        분
                      </div>
                      <button className={styles.cardDelete} onClick={() => deletePlace(placeCard?.id)}>
                        <Close fontSize="small" color="error" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Box my={0.5}>
              <p className={styles.explain}>가고 싶은 장소들을 검색하여 추가해주세요.</p>
              <p className={styles.explain}>설정하신 일자별 여행시간 내에서</p>
              <p className={styles.explain}>하루 평균 최대 8개 장소까지 선택 가능합니다.</p>
            </Box>
          </>
        )}
      </div>
    </>
  );
}

export default InfoListPlace;
