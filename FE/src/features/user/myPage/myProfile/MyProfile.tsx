import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./MyProfile.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";

interface MyProfileProps {
  setViewSchedule: Dispatch<SetStateAction<boolean>>;
}

const MyProfile = ({ setViewSchedule }: MyProfileProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.myProfile}>
      <div className={styles.myProfileInfo}>
        <img className={styles.profileImg} src={sampleImg} />
      </div>

      <div className={styles.myProfileInfo}>
        <Text value="kjy" type="pageTitle" bold />
      </div>
      <button className={styles.myProfileInfo} onClick={() => navigate("/profile")}>
        <Text value="프로필 수정" />
      </button>

      <div className={styles.myProfileInfo} onClick={() => setViewSchedule(true)}>
        <Text value="나의 일정" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value="0" type="pageTitle" bold />
      </div>

      <div className={styles.myProfileInfo} onClick={() => setViewSchedule(false)}>
        <Text value="나의 친구" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value="1" type="pageTitle" bold />
        <br />
      </div>
    </div>
  );
};

export default MyProfile;
