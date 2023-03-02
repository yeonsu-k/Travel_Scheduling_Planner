import React, { useState } from "react";
import styles from "./Search.module.css";
import { Info, Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Text from "components/Text";

function SearchListCard(props: { id: number; image: string; name: string }): JSX.Element {
  return (
    <div className={styles.card}>
      <img src={props.image} alt="" />
      <div className={styles.placeCard}>
        <Text value={props.name} type={"caption"} />
        <div className={styles.card_Icons}>
          <div />
          <div />
          <IconButton disableRipple sx={{ padding: "0px" }}>
            <Info fontSize="small" className={styles.info_icon} />
          </IconButton>
          <IconButton size="small" disableRipple>
            <Add fontSize="small" className={styles.add_icon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default SearchListCard;
