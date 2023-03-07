import React from "react";
import styles from "./Search.module.css";
import { Hotel, Place } from "@mui/icons-material";

function SearchRadioBtn({ keyword, getKeyWord }: { keyword: string; getKeyWord: (keyWord: string) => void }) {
  const clickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    getKeyWord(e.target.value);
  };

  return (
    <div className={styles.searchRadio}>
      <label className={styles.radio_label}>
        <input type="radio" value="호텔" checked={keyword === "호텔"} onChange={(e) => clickRadioButton(e)} />
        <span>
          <Hotel fontSize="small" />
          <span>호텔</span>
        </span>
      </label>
      <label className={styles.radio_label}>
        <input type="radio" value="장소" checked={keyword === "장소"} onChange={(e) => clickRadioButton(e)} />
        <span>
          <Place fontSize="small" />
          <span>장소</span>
        </span>
      </label>
    </div>
  );
}

export default SearchRadioBtn;
