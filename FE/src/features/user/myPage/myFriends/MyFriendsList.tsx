import React from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "assets/sample/cat.png";

const MyFriendsList = () => {
  return (
    <div className={styles.myFriendsList}>
      <div>
        <img src={sampleImg} alt="" />
      </div>
      <div>
        <div>이메일 abc@abc.com</div>
        <div>닉네임 마이로</div>
      </div>
      <div>함께 공유한 여행 일정 2</div>
      <div>
        <button>친구 삭제</button>
      </div>
    </div>
  );
};

export default MyFriendsList;
