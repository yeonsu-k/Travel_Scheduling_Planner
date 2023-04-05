import React, { useLayoutEffect, useState } from "react";
import SearchListCard from "./SearchListCard";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { Box } from "@mui/material";
import Text from "components/Text";
import defaultPhoto from "asset/defaultPhoto.jpg";
import { basicConfig, selectRegion } from "slices/scheduleCreateSlice";
import { useAppSelector } from "app/hooks";

interface SearchListType {
  select: string;
  keyword: string;
  searchView: boolean;
  scheduleCreatProps: ScheduleCreatPropsType;
}

interface getRecommendApiType {
  locationId: number;
  locationName: string;
  locationURL: string;
  address: string;
  latitude: number;
  longitude: number;
  hotel: boolean;
  regionId: number;
}

function SearchList(props: SearchListType) {
  const { select, keyword, searchView, scheduleCreatProps } = props;
  const region = useAppSelector(selectRegion);
  const [list, setCardList] = useState<basicConfig[]>([]);

  const listViewType = () => {
    setCardList([]);
    async function fetch() {
      let response;
      let resData;
      if (searchView) {
        response = await Axios.post(api.createSchedule.searchLocation(), {
          regionId: region.id,
          locationName: keyword,
          isHotel: select === "호텔",
        });
      } else {
        response = await Axios.get(api.createSchedule.getRecommend(select == "호텔" ? 1 : 0, region.id));
      }
      resData = response.data.data;
      if (window.innerWidth <= 600) resData = resData.splice(0, 6);
      setCardList(
        resData.map((ele: getRecommendApiType) => {
          ele.locationURL = ele.locationURL == null ? defaultPhoto : ele.locationURL; // API변경시 사진으로 수정
          return ele;
        }),
      );
    }
    fetch();
  };

  useLayoutEffect(() => {
    listViewType();
  }, [select, keyword, region]);

  return (
    <>
      <Box textAlign="center" my={1.5}>
        {searchView ? (
          <Text value={`${select} 검색결과(${list.length}건)`} bold />
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
