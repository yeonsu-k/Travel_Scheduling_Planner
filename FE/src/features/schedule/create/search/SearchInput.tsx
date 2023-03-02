import React, { useState } from "react";
import styles from "./Search.module.css";
import { Close, Search } from "@mui/icons-material";

function SearchInput() {
  const [searchInput, setSearch] = useState("");

  const searchSpotsOrHotels = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchCancel = () => {
    setSearch("");
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_input}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchInput}
          onChange={(e) => searchSpotsOrHotels(e)}
        />
      </div>
      {searchInput.length >= 2 ? (
        <button className={`${styles.close_button} ${styles.search_button}`} onClick={() => searchCancel()}>
          <Close fontSize="small" />
        </button>
      ) : (
        <button className={styles.search_button}>
          <Search />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
