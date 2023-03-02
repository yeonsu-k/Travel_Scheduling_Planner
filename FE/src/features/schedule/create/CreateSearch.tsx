import React from "react";
import styles from "./CreateInfo.module.css";
import SearchRadioBtn from "./search/SearchRadioBtn";

function CreateRight() {
  return (
    <div className={styles.Container}>
      <SearchRadioBtn />
    </div>
  );
}

export default CreateRight;
