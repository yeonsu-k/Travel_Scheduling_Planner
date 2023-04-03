import React, { useState } from "react";
import {
  basicConfig,
  selectHotelList,
  selectMarker,
  selectPlaceList,
  selectPointPlace,
  setHotelList,
  setMarker,
  setPlaceList,
  setPointPlace,
} from "slices/scheduleCreateSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./Search.module.css";
import { Info, Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Modal from "@mui/material/Modal";
import Text from "components/Text";
import SearchCardInfoModal from "./SearchCardInfoModal";
import { ScheduleCreatPropsType } from "pages/ScheduleCreatePage";
import { useLocation } from "react-router-dom";
import { selectKeepPlaceList, setKeepPlaceList } from "slices/scheduleEditSlice";

interface SearchListCardType {
  cardInfo: basicConfig;
  select: string;
  scheduleCreatProps: ScheduleCreatPropsType;
}

function SearchListCard({ cardInfo, select, scheduleCreatProps }: SearchListCardType) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hotel: (basicConfig | null)[] = useAppSelector(selectHotelList);
  const place: basicConfig[] = useAppSelector(selectPlaceList);
  const pointPlace: (basicConfig | null)[] = useAppSelector(selectPointPlace);
  const marker = useAppSelector(selectMarker);
  const keepPlaceList = useAppSelector(selectKeepPlaceList);
  const [ModalOpen, setModalOpen] = useState(false);
  const { hotelCurrentDay, placeCurrentDay, setCurrentTab, setHotelCurrentDay, setPlaceCurrentDay } =
    scheduleCreatProps;

  const InfoAddClick = () => {
    if (placeCurrentDay != -1) {
      setPlaceCurrentDay(-1);
      const pointPlaceList = [...pointPlace];
      pointPlaceList[placeCurrentDay] = cardInfo;
      dispatch(setPointPlace([...pointPlaceList]));
      dispatch(
        setMarker([
          ...marker,
          {
            info: cardInfo,
            type: "point",
          },
        ]),
      );
    } else {
      setCurrentTab(select);
      if (select === "호텔") {
        const hotelList = [...hotel];
        const markerList = [...marker];
        if (hotelList[hotelCurrentDay] != null) {
          const changedIdx = markerList.findIndex((value) => value.info?.id === hotelList[hotelCurrentDay]?.id);
          markerList.splice(changedIdx, 1);
        }
        dispatch(
          setMarker([
            ...markerList,
            {
              info: cardInfo,
              type: "hotel",
            },
          ]),
        );

        hotelList[hotelCurrentDay] = cardInfo;
        setHotelCurrentDay(hotelCurrentDay + 1 == hotel.length ? 0 : hotelCurrentDay + 1);
        dispatch(setHotelList(hotelList));
      } else if (select === "장소") {
        const placeList = [...place];
        placeList.push({
          ...cardInfo,
          time: "2:00",
        });
        dispatch(setPlaceList(placeList));

        dispatch(
          setMarker([
            ...marker,
            {
              info: cardInfo,
              type: "place",
            },
          ]),
        );
      }
    }
  };

  const AddKeepList = () => {
    const item = cardInfo;
    console.log(cardInfo);
    dispatch(setKeepPlaceList([...keepPlaceList, cardInfo]));
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
          <IconButton
            size="small"
            disableRipple
            onClick={() => {
              console.log("path", location.pathname);
              if (location.pathname == "/schedule/create") {
                InfoAddClick();
              } else {
                AddKeepList();
              }
            }}
          >
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
