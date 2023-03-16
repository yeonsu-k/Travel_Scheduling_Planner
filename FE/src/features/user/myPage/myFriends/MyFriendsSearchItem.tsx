import React, { useEffect } from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import Button from "components/Button";
import { useAppSelector } from "app/hooks";
import { selectSearchUser } from "slices/friendSlice";

const MyFriendsSearchItem = () => {
  const searchUser = useAppSelector(selectSearchUser);

  return (
    <>
      {searchUser.success ? (
        <div className={styles.myFriendsSearchItem}>
          <div className={styles.searchInfo}>
            <img className={styles.searchImg} src={searchUser.profile} />
          </div>

          <div className={styles.searchInfo}>
            <Text value={searchUser.nickname} bold />
          </div>

          <div className={styles.searchInfo}>
            <Text value={searchUser.email} />
          </div>

          <div className={styles.searchInfo}>
            <Button text="친구 요청" color="pink" radius />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyFriendsSearchItem;
