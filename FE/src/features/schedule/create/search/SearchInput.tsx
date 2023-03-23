import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";
import { Close, Search } from "@mui/icons-material";

interface searchType {
  select: string;
  searchBtnClick: (str: string) => void;
  keyWordClear: () => void;
}

function SearchInput({ select, searchBtnClick, keyWordClear }: searchType) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [select]);

  const inputCancle = () => {
    setInputValue("");
    keyWordClear();
  };

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              searchBtnClick(inputValue);
            }
          }}
        />
      </div>
      {inputValue.length > 0 && (
        <button className={`${styles.close_button} ${styles.search_button}`} onClick={inputCancle}>
          <Close fontSize="small" />
        </button>
      )}
      <button className={styles.search_button} onClick={() => searchBtnClick(inputValue)}>
        <Search />
      </button>
    </div>
  );
}

export default SearchInput;
