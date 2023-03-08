import React from "react";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import MyFriendsSearchItem from "./MyFriendsSearchItem";

const MyFriendsAdd = () => {
  return (
    <div className={styles.myFriendsAdd}>
      <div className={styles.titleText}>
        <div className={styles.designBox}></div>
        <Text value="사용자 이메일을 정확히 입력해주세요." type="text" />
      </div>

      <div className={styles.inputBox}>
        <div className={styles.emailInput}>
          <Input name="emailInput" placeholder="이메일" />
        </div>

        <Button text="검색" color="main" radius />
      </div>

      <MyFriendsSearchItem />
    </div>
  );
};

export default MyFriendsAdd;
