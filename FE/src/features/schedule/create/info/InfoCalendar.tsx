import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import ko from "date-fns/locale/ko";
import colorPalette from "styles/colorPalette";
import styles from "./Info.module.css";
import { scheduleActions } from "slices/scheduleCreateSlice";
import { addDays, differenceInDays, format } from "date-fns";

function InfoCalendar() {
  const dispatch = useDispatch();
  const { date } = useSelector((state: rootState) => state.scheduleCreate);

  const [state, setState] = React.useState([
    {
      startDate: new Date(date.start),
      endDate: new Date(date.end),
      key: "selection",
    },
  ]);

  const saveDate = () => {
    if (typeof state[0] != undefined) {
      dispatch(
        scheduleActions.setDate({
          date: {
            start: format(state[0].startDate, "yyyy-MM-dd"),
            end:
              state[0].startDate === state[0].endDate
                ? format(addDays(state[0].endDate, 1), "yyyy-MM-dd")
                : format(state[0].endDate, "yyyy-MM-dd"),
          },
        }),
      );
    }
  };

  const changeDate = (e: RangeKeyDict) => {
    const start = e.selection.startDate ? e.selection.startDate : new Date(date.start);
    const end = e.selection.endDate ? e.selection.endDate : new Date(date.end);
    setState([
      {
        startDate: start,
        endDate: differenceInDays(end, start) > 10 ? addDays(start, 9) : end,
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
      <button className={styles.calendarSave_btn} onClick={saveDate}>
        적용하기
      </button>
    </>
  );
}

export default InfoCalendar;
