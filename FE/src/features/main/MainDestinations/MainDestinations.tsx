import api from "api/Api";
import Axios from "api/JsonAxios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DestinationConfig, setDestinationList } from "slices/mainSlice";
import styles from "../Main.module.css";
import MainCarousel from "../Components/MainCarousel";

const MainDestinations = () => {
  const dispatch = useDispatch();
  const [destinations, setDestinations] = useState<DestinationConfig[]>([]);

  const getDestination = async () => {
    await Axios.get(api.createSchedule.mainPlace())
      .then((res) => {
        setDestinations(res.data.data);
        dispatch(setDestinationList({ destinationList: res.data.data }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDestination();
  }, []);

  return (
    <div id={styles.mainPopular}>
      <div className={styles.mainTextContainer}>
        <div className={styles.mainTitleText}>인기 여행지</div>
        <div className={styles.mainSubTitleText}>POPULAR DESTINATIONS</div>
      </div>
      <div>
        <MainCarousel type="destination" destinations={destinations} />
      </div>
    </div>
  );
};

export default MainDestinations;
