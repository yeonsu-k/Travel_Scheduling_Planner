import React from "react";
import styles from "./CreateInfo.module.css";
import SearchRadioBtn from "./search/SearchRadioBtn";
import SearchInput from "./search/SearchInput";
import { Stack } from "@mui/material";
import SearchList from "./search/SearchList";

function CreateRight() {
  return (
    <Stack className={styles.Container} spacing={1}>
      <SearchRadioBtn />
      <SearchInput />
      <SearchList />
    </Stack>
  );
}

export default CreateRight;
