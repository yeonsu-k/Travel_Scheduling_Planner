import React from "react";
import MyFriendsList from "./MyFriendsList";
import styles from "./MyFriends.module.css";

const MyFriends = () => {
  return (
    <div>
      <div className={styles.myFriendsTitle}>
        <div>나의 친구</div>
        <button className={styles.addFriendsButton}>친구 추가하기</button>
      </div>
      <MyFriendsList />
    </div>
  );
};

export default MyFriends;
