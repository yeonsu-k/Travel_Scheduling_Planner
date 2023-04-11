import React, { useState } from "react";
import styles from "../Main.module.css";
import MainDestinationsFilter from "./MainDestinationsFilter";
import MainDestinationItem from "./MainDestinationsItem";
import Text from "components/Text";
import Button from "components/Button";
import { DestinationConfig, selectDestinationList } from "slices/mainSlice";
import { useAppSelector } from "app/hooks";

interface Props {
  onMoveToElement: () => void;
}

const MainDestinationsList = ({ onMoveToElement }: Props) => {
  const destinations: DestinationConfig[] = useAppSelector(selectDestinationList);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<number>(0);

  const filterItems = () => {
    let result = destinations.filter((item: DestinationConfig) => {
      const name = "대한민국" + item.regionName;
      return name.includes(input);
    });

    if (selected == 0) {
      result = result.sort((a, b) => (a.regionName > b.regionName ? 1 : -1));
    } else {
      result = result.sort((a, b) => (a.regionName < b.regionName ? 1 : -1));
    }
    return result;
  };

  return (
    <div>
      <div id="goSkip" className={styles.mainTitleText}>
        <span className={styles.pageTitle}>어디로 여행을 떠나시나요?</span>
      </div>
      <div className={styles.mainSubTitleTextK}>
        <Text value="여행지를 검색하거나 목록에서 직접 선택해주세요." type="caption" color="lightgray" />
      </div>
      <div className={styles.container}>
        <div className={styles.mainInputContainer}>
          <div className={styles.mainInputIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <circle fill="none" stroke="#999" strokeWidth="1.1" cx="9" cy="9" r="7"></circle>
              <path fill="none" stroke="#999" strokeWidth="1.1" d="M14,14 L18,18 L14,14 Z"></path>
            </svg>
          </div>
          <input className={styles.mainInput} onChange={(e) => setInput(e.target.value.replaceAll(" ", ""))} />
        </div>
      </div>
      <div className={styles.mainFilterContainer}>
        <MainDestinationsFilter setSelected={setSelected} />
      </div>
      <div className={styles.mainDestinationContainer}>
        {filterItems().map((item: DestinationConfig, i: number) => (
          <MainDestinationItem key={i} {...item} />
        ))}
      </div>
      <div className={styles.upBtn}>
        <Button height="100%" text="여행지 선택화면으로 돌아가기" onClick={onMoveToElement} />
      </div>
    </div>
  );
};

export default MainDestinationsList;
