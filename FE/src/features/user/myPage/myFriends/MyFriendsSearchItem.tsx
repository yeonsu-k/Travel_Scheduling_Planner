import React from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import Button from "components/Button";

const MyFriendsSearchItem = () => {
  return (
    <div className={styles.myFriendsSearchItem}>
      <div className={styles.searchInfo}>
        <img className={styles.searchImg} src={sampleImg} />
      </div>

      <div className={styles.searchInfo}>
        <Text value="마이로" bold />
      </div>

      <div className={styles.searchInfo}>
        <Text value="myro@myro.com" />
      </div>

      <div className={styles.searchInfo}>
        <Button text="친구 요청" color="pink" radius />
      </div>
    </div>
  );
};

export default MyFriendsSearchItem;
