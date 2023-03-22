import React, { useState } from "react";
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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState(false);

  const getKeyWord = (keyWord: string) => {
    setSelect(keyWord);
    setSearchInput("");
    setSearch(false);
  };

  const getInputValue = (str: string) => {
    setSearchInput(str);
  };

  const searchBtnClick = () => {
    setSearch(true);
    if (searchInput.length >= 2) {
      // {select}목록 {searchInput} 단어 검색 API 연결
    }
  };

  const cancleBtnClick = () => {
    setSearchInput("");
    setSearch(false);
  };

  return (
    <Stack className={styles.Container}>
      <Stack spacing={0.5} p={0.2}>
        <SearchRadioBtn keyword={select} getKeyWord={getKeyWord} />
        <SearchInput
          value={searchInput}
          getValue={getInputValue}
          searchBtnClick={searchBtnClick}
          cancleBtnClick={cancleBtnClick}
        />
      </Stack>
      {search && searchInput.length < 2 ? (
        <Box className={styles.center} my={1.5}>
          <Text value={`${select}${select === "호텔" ? "을" : "를"} 검색하세요`} bold />
          <Stack className={styles.searchWarning} my={2} spacing={0.5} justifyContent="center" alignItems="center">
            <ErrorOutline />
            <small>{select}명을 검색하세요.</small>
            <small>검색어는 두 글자 이상 입력해주세요.</small>
          </Stack>
          <Box component="p" mt={1} onClick={() => setSearch(false)} className={styles.againRecommend}>
            다시 추천 {select} 보기
          </Box>
        </Box>
      ) : (
        <div className={styles.scroll}>
          <SearchList select={select} searchClick={search} keyword={searchInput} scheduleCreatProps={props} />
        </div>
      )}
    </Stack>
  );
}

export default CreateRight;
