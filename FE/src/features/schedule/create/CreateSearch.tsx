import React, { useEffect, useState } from "react";
import styles from "./Create.module.css";
import SearchRadioBtn from "./search/SearchRadioBtn";
import SearchInput from "./search/SearchInput";
import { Box, Stack } from "@mui/material";
import SearchList from "./search/SearchList";
import Text from "components/Text";
import { ErrorOutline } from "@mui/icons-material";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";

function CreateRight(props: ScheduleCreatPropsType) {
  const [select, setSelect] = useState("호텔");
  const [keyword, setKeyword] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [searchView, setSearchView] = useState(false);

  useEffect(() => {
    if (keyword.length >= 2) setSearchView(true);
  }, [keyword]);

  const getSelect = (radio: string) => {
    setSelect(radio);
    keyWordClear();
  };

  const searchBtnClick = (str: string) => {
    setKeyword(str);
    setSearchClick(true);
  };

  const keyWordClear = () => {
    setKeyword("");
    setSearchClick(false);
    setSearchView(false);
  };

  return (
    <Stack className={styles.Container}>
      <Stack spacing={0.5} p={0.2}>
        <SearchRadioBtn select={select} getSelect={getSelect} />
        <SearchInput select={select} searchBtnClick={searchBtnClick} keyWordClear={keyWordClear} />
      </Stack>
      {searchClick ? (
        !searchView ? (
          <Box className={styles.center} my={1.5}>
            <Text value={`${select}${select === "호텔" ? "을" : "를"} 검색하세요`} bold />
            <Stack className={styles.searchWarning} my={2} spacing={0.5} justifyContent="center" alignItems="center">
              <ErrorOutline />
              <small>{select}명을 검색하세요.</small>
              <small>검색어는 두 글자 이상 입력해주세요.</small>
            </Stack>
            <Box component="p" mt={1} onClick={() => setSearchClick(false)} className={styles.againRecommend}>
              다시 추천 {select} 보기
            </Box>
          </Box>
        ) : (
          // 키워드 검색
          <div className={styles.scroll}>
            <SearchList select={select} keyword={keyword} searchView={searchView} scheduleCreatProps={props} />
          </div>
        )
      ) : (
        // 추천 검색
        <div className={styles.scroll}>
          <SearchList select={select} keyword={keyword} searchView={searchView} scheduleCreatProps={props} />
        </div>
      )}
    </Stack>
  );
}

export default CreateRight;
