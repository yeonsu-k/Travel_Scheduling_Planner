import React, { useEffect, useMemo, useState } from "react";
import SearchListCard from "./SearchListCard";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { Box } from "@mui/material";
import Text from "components/Text";
import defaultPhoto from "asset/defaultPhoto.jpg";
import { basicConfig } from "slices/scheduleCreateSlice";

interface SearchListType {
  select: string;
  searchClick: boolean;
  keyword: string;
  scheduleCreatProps: ScheduleCreatPropsType;
}

interface getRecommendApiType {
  locationId: number;
  locationName: string;
  address: string;
  latitude: number;
  longitude: number;
  hotel: boolean;
  regionId: number;
}

function SearchList(props: SearchListType) {
  const { select, keyword, searchClick, scheduleCreatProps } = props;
  const [list, setCardList] = useState<basicConfig[]>([]);

  useEffect(() => {
    if (searchClick) {
      // 키워드 있는 검색 API
    } else {
      Axios.get(api.createSchedule.getRecommend(select == "호텔" ? 1 : 0, 1)).then((res) => {
        setCardList(
          res.data.data.map((ele: getRecommendApiType) => {
            return {
              id: ele.locationId,
              image: defaultPhoto,
              name: ele.locationName,
              address: ele.address,
              latitude: ele.latitude,
              longitude: ele.longitude,
            };
          }),
        );
      });
    }
  }, [select]);

  return (
    <>
      <Box textAlign="center" my={1.5}>
        {searchClick ? (
          <Text value={select + `검색결과(${list.length}건)`} bold />
        ) : (
          <Text value={"추천 " + select} bold />
        )}
      </Box>
      {list.map((card, index) => {
        return (
          <Box key={index} mb={1}>
            <SearchListCard cardInfo={card} select={select} scheduleCreatProps={scheduleCreatProps} />
          </Box>
        );
      })}
    </>
  );
}

export default SearchList;
