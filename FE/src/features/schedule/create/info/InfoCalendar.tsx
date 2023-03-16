import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectDate, setDate, setHotelList } from "slices/scheduleCreateSlice";
import styles from "./Info.module.css";
import colorPalette from "styles/colorPalette";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ko from "date-fns/locale/ko";
import { addDays, differenceInDays, format } from "date-fns";

function InfoCalendar({ modalClose }: { modalClose: () => void }) {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);

  const [state, setState] = useState([
    {
      startDate: new Date(date.start),
      endDate: new Date(date.end),
      key: "selection",
    },
  ]);

  const saveDate = () => {
    if (typeof state[0] != undefined) {
      const startDay = state[0].startDate;
      const endDay = state[0].startDate === state[0].endDate ? addDays(state[0].endDate, 1) : state[0].endDate;
      dispatch(
        setDate({
          start: format(startDay, "yyyy-MM-dd"),
          end: format(endDay, "yyyy-MM-dd"),
        }),
      );
      dispatch(setHotelList(Array.from({ length: differenceInDays(endDay, startDay) }, () => null)));
    }
  };

  const changeDate = (e: RangeKeyDict) => {
    const start = e.selection.startDate ? e.selection.startDate : new Date(date.start);
    const end = e.selection.endDate ? e.selection.endDate : new Date(date.end);
    setState([
      {
        startDate: start,
        endDate: differenceInDays(end, start) > 9 ? addDays(start, 9) : end,
        key: "selection",
      },
    ]);
  };
  return (
    <>
      <DateRange
        editableDateInputs={false}
        onChange={changeDate}
        moveRangeOnFirstSelection={false}
        ranges={state}
        months={1}
        showMonthAndYearPickers={false}
        rangeColors={[colorPalette.main]}
        fixedHeight={true}
        direction="horizontal"
        dateDisplayFormat={"PPP"}
        monthDisplayFormat={"yyyy MMM"}
        locale={ko}
      />
      <button
        className={styles.calendarSave_btn}
        onClick={() => {
          saveDate();
          modalClose();
        }}
      >
        적용하기
      </button>
    </>
  );
}

export default InfoCalendar;
