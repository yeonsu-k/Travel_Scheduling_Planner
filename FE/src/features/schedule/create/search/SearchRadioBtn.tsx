import React, { useState } from "react";
import styles from "./Search.module.css";
import { Hotel, Place } from "@mui/icons-material";

function SearchRadioBtn() {
  const [select, setSelect] = useState("hotel");

  const clickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(e.target.value);
  };

  return (
    <div className={styles.searchRadio}>
      <label className={styles.radio_label}>
        <input type="radio" value="hotel" checked={select === "hotel"} onChange={(e) => clickRadioButton(e)} />
        <span>
          <Hotel fontSize="small" />
          <span>호텔</span>
        </span>
      </label>
      <label className={styles.radio_label}>
        <input type="radio" value="place" checked={select === "place"} onChange={(e) => clickRadioButton(e)} />
        <span>
          <Place fontSize="small" />
          <span>장소</span>
        </span>
      </label>
    </div>
  );
}

export default SearchRadioBtn;
