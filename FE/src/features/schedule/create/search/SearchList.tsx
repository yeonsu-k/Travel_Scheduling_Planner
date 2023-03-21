import React, { useEffect, useMemo, useState } from "react";
import SearchListCard from "./SearchListCard";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import Axios from "api/JsonAxios";
import api from "api/Api";

interface RecommendType {
  id: number;
  image: string;
  name: string;
}

function SearchList(props: { select: string; scheduleCreatProps: ScheduleCreatPropsType }) {
  const { select } = props;
  const [list, setCardList] = useState<RecommendType[]>([]);

  useEffect(() => {
    Axios.get(api.createSchedule.getRecommend(select == "호텔" ? 1 : 0, 1)).then((res) => {
      setCardList(
        res.data.data.map((ele: { locationId: number; locationName: string }) => {
          return { id: ele.locationId, image: "", name: ele.locationName };
        }),
      );
    });
  }, [select]);

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
