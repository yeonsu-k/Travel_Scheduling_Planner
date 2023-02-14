import React from "react";
import MyFriendsList from "./MyFriendsList";
import styles from "./MyFriends.module.css";
import Text from "components/Text";

const MyFriends = () => {
  return (
    <div className={styles.myFriends}>
      <div className={styles.myFriendsTitle}>
        <Text value="나의 친구" type="textTitle" bold en />
        <button className={styles.addFriendsButton}>
          <Text value="친구 추가하기" color="white" bold />
        </button>
      </div>
      <MyFriendsList />
    </div>
  );
};

export default MyFriends;
