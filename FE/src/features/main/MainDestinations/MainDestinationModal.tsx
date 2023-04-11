import React, { Dispatch, SetStateAction } from "react";
import styles from "../Main.module.css";
import Text from "components/Text";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { setListClear, setRegion } from "slices/scheduleCreateSlice";
import { useNavigate } from "react-router-dom";
import { DestinationConfig } from "slices/mainSlice";

interface modalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  item: DestinationConfig;
}

const MainDestinationModal = ({ setModalOpen, item }: modalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { regionId, regionName, regionImageURL, englishName, contents } = item;

  const moveToCreate = () => {
    dispatch(
      setRegion({
        id: regionId,
        name: regionName,
        engName: englishName,
      }),
    );
    dispatch(setListClear());
    navigate("/schedule/create");
  };

  return (
    <div className={styles.mainModalContainer}>
      <div className={styles.imgContainer}>
        <img src={regionImageURL} />
      </div>
      <div className={styles.contContainer}>
        <div className={styles.contTextTitle}>{englishName}</div>
        <Text value={regionName} type="groupTitle" />
        <div className={styles.contTextContents}>
          <Text value={contents} type="text" color="lightgray" />
        </div>
        <Button width="20%" height="18%" text="일정 만들기" color="main" onClick={moveToCreate} />
      </div>
      <div className={styles.closeBtn} onClick={() => setModalOpen(false)}>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <line fill="none" stroke="#999" strokeWidth="1.4" x1="1" y1="1" x2="19" y2="19"></line>
          <line fill="none" stroke="#999" strokeWidth="1.4" x1="19" y1="1" x2="1" y2="19"></line>
        </svg>
      </div>
    </div>
  );
};

export default MainDestinationModal;
