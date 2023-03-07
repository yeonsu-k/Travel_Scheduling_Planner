import React, { useState } from "react";
import { scheduleActions } from "slices/scheduleCreateSlice";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "app/store";
import styles from "./Search.module.css";
import { Info, Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Text from "components/Text";
import SearchCardInfoModal from "./SearchCardInfoModal";

interface SearchListCardType {
  cardInfo: { id: number; image: string; name: string };
  select: string;
}

function SearchListCard({ cardInfo, select }: SearchListCardType) {
  const dispatch = useDispatch();
  const { hotel } = useSelector((state: rootState) => state.scheduleCreate);
  const { place } = useSelector((state: rootState) => state.scheduleCreate);
  const [ModalOpen, setModalOpen] = useState(false);

  const InfoAddClick = () => {
    if (select === "호텔") {
      const hotelList = [...hotel];
      hotelList.push(cardInfo);
      dispatch(scheduleActions.setHotelList({ hotel: [...hotelList] }));
    }
    if (select === "장소") {
      const placeList = [...place];
      placeList.push({
        id: cardInfo.id,
        image: cardInfo.image,
        name: cardInfo.name,
        time: "2:00",
      });
      dispatch(scheduleActions.setPlaceList({ place: [...placeList] }));
    }
  };

  return (
    <div className={styles.card}>
      <img src={cardInfo.image} alt="" />
      <div className={styles.placeCard}>
        <Text value={cardInfo.name} type={"caption"} />
        <div className={styles.card_Icons}>
          <div />
          <div />
          <IconButton disableRipple sx={{ padding: "0px" }} onClick={() => setModalOpen(true)}>
            <Info fontSize="small" className={styles.info_icon} />
          </IconButton>
          <IconButton size="small" disableRipple onClick={() => InfoAddClick()}>
            <Add fontSize="small" className={styles.add_icon} />
          </IconButton>
        </div>
      </div>
      {ModalOpen && (
        <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
          <SearchCardInfoModal
            place={cardInfo}
            setModalOpen={() => setModalOpen(false)}
            InfoAddClick={() => InfoAddClick()}
          />
        </Modal>
      )}
    </div>
  );
}

export default SearchListCard;
