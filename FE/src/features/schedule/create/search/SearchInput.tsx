import React, { useState } from "react";
import styles from "./Search.module.css";
import { Close, Search } from "@mui/icons-material";

interface searchType {
  value: string;
  getValue: (str: string) => void;
  searchBtnClick: () => void;
  cancleBtnClick: () => void;
}

function SearchInput({ value, getValue, searchBtnClick, cancleBtnClick }: searchType) {
  return (
    <div className={styles.search_container}>
      <div className={styles.search_input}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          onFocus={(e) => {
            e.target.placeholder = "";
          }}
          onBlur={(e) => {
            e.target.placeholder = "검색어를 입력하세요.";
          }}
          value={value}
          onChange={(e) => getValue(e.target.value)}
        />
      </div>
      {value.length > 0 && (
        <button className={`${styles.close_button} ${styles.search_button}`} onClick={() => cancleBtnClick()}>
          <Close fontSize="small" />
        </button>
      )}
      <button className={styles.search_button} onClick={() => searchBtnClick()}>
        <Search />
      </button>
    </div>
  );
}

export default SearchInput;
