import React from "react";
import styles from "./CreateInfo.module.css";
import SearchRadioBtn from "./search/SearchRadioBtn";
import SearchInput from "./search/SearchInput";
import { Box, Stack } from "@mui/material";
import SearchList from "./search/SearchList";
import Text from "components/Text";

function CreateRight() {
  return (
    <Stack className={styles.Container}>
      <Stack spacing={1}>
        <SearchRadioBtn />
        <SearchInput />
      </Stack>
      <Box className={styles.center} my={1.5}>
        <Text value="추천 호텔" bold />
      </Box>
      <div className={styles.scroll}>
        <SearchList />
      </div>
    </Stack>
  );
}

export default CreateRight;
