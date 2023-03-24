import React from "react";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { friendProps, getFriendInfo } from "pages/MyPage";

interface MyFriendsListProps {
  friendInfo: friendProps;
}

const MyFriendsList = ({ friendInfo }: MyFriendsListProps) => {
  const onClickDeleteFriend = () => {
    Axios.delete(api.friend.friend(), {
      data: {
        email: friendInfo.email,
      },
    })
      .then((res) => {
        console.log(res);
        alert("삭제가 완료되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });

    getFriendInfo();
  };

  return (
    <div className={styles.myFriendsList}>
      <div className={styles.friendInfo}>
        <img className={styles.profileImg} src={friendInfo.profile} alt="" />
      </div>

      <div className={styles.friendInfo}>
        <Text value="이메일" color="main" bold />
        <div style={{ margin: "1rem" }}></div>
        <Text value={friendInfo.email} />
      </div>

      <div className={styles.friendInfo}>
        <Text value="닉네임" color="main" bold />
        <div style={{ margin: "1rem" }}></div>
        <Text value={friendInfo.nickname} />
      </div>

      <div className={styles.friendInfo}>
        {/* <Text value="함께 공유한 여행 일정" color="main" bold />
            <div style={{ margin: "1rem" }}></div>
            <Text value="2" /> */}
      </div>
      <div className={styles.friendInfo}>
        <Button text="친구 삭제" onClick={onClickDeleteFriend} />
      </div>
    </div>
  );
};

export default MyFriendsList;
