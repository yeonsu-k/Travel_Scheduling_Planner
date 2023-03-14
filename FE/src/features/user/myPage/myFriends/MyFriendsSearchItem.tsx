import React, { useEffect } from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import Button from "components/Button";

interface MyFriendsSearchItemProps {
  searchData: searchDataProps;
}

export interface searchDataProps {
  email: string;
  exist: boolean;
  nickname: string;
  profile: string;
  status: string;
  success: boolean;
}

const MyFriendsSearchItem = ({ searchData }: MyFriendsSearchItemProps) => {
  useEffect(() => {
    console.log("searchItem searchData", searchData);
  }, []);

  return (
    <div className={styles.myFriendsSearchItem}>
      <div className={styles.searchInfo}>
        <img className={styles.searchImg} src={searchData.profile} />
      </div>

      <div className={styles.searchInfo}>
        <Text value={searchData.nickname} bold />
      </div>

      <div className={styles.searchInfo}>
        <Text value={searchData.email} />
      </div>

      <div className={styles.searchInfo}>
        <Button text="친구 요청" color="pink" radius />
      </div>
    </div>
  );
};

export default MyFriendsSearchItem;
