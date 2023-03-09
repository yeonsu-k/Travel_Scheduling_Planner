import React, { useEffect, useState } from "react";
import SearchListCard from "./SearchListCard";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";

function SearchList(props: { select: string; scheduleCreatProps: ScheduleCreatPropsType }) {
  const [list, setCardList] = useState<{ id: number; image: string; name: string }[]>([]);

  return (
    <>
      {list.map((card, index) => {
        return (
          <div key={index}>
            <SearchListCard cardInfo={card} select={props.select} scheduleCreatProps={props.scheduleCreatProps} />
          </div>
        );
      })}
    </>
  );
}

export default SearchList;
