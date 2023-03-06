import React, { useState } from "react";
import styles from "./Search.module.css";
import { Info, Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Text from "components/Text";
import SearchCardInfoModal from "./SearchCardInfoModal";

function SearchListCard(props: { id: number; image: string; name: string }) {
  const [ModalOpen, setModalOpen] = useState(false);

  function SearchAdd(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={styles.card}>
      <img src={props.image} alt="" />
      <div className={styles.placeCard}>
        <Text value={props.name} type={"caption"} />
        <div className={styles.card_Icons}>
          <div />
          <div />
          <IconButton disableRipple sx={{ padding: "0px" }} onClick={() => setModalOpen(true)}>
            <Info fontSize="small" className={styles.info_icon} />
          </IconButton>
          <IconButton size="small" disableRipple onClick={() => SearchAdd()}>
            <Add fontSize="small" className={styles.add_icon} />
          </IconButton>
        </div>
      </div>
      {ModalOpen && (
        <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
          <SearchCardInfoModal place={props} setModalOpen={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default SearchListCard;
