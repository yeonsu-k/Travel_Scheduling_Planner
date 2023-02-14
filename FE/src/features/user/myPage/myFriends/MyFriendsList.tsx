import React from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";

const MyFriendsList = () => {
  return (
    <div className={styles.myFriendsList}>
      <div className={styles.friendInfo}>
        <img className={styles.profileImg} src={sampleImg} alt="" />
      </div>

      <div className={styles.friendInfo}>
        <Text value="이메일" color="main" bold />
        <div style={{ margin: "1rem" }}></div>
        <Text value="myro@myro.com" />
      </div>

      <div className={styles.friendInfo}>
        <Text value="닉네임" color="main" bold />
        <div style={{ margin: "1rem" }}></div>
        <Text value="마이로" />
      </div>

      <div className={styles.friendInfo}>
        <Text value="함께 공유한 여행 일정" color="main" bold />
        <div style={{ margin: "1rem" }}></div>
        <Text value="2" />
      </div>
      <div className={styles.friendInfo}>
        <button>
          <Text value="친구 삭제" />
        </button>
      </div>
    </div>
  );
};

export default MyFriendsList;
