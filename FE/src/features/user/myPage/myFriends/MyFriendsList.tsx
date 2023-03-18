import React, { useEffect } from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import Button from "components/Button";
import { useAppSelector } from "app/hooks";
import { selectFriends } from "slices/friendSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";

const MyFriendsList = () => {
  const friends = useAppSelector(selectFriends);

  const onClickDeleteFriend = (email: string) => {
    Axios.delete(api.friend.friend(), {
      data: {
        email: email,
      },
    })
      .then((res: any) => {
        console.log(res);
        alert("삭제가 완료되었습니다");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      {friends.map((value, key) => (
        <div className={styles.myFriendsList} key={key}>
          <div className={styles.friendInfo}>
            <img className={styles.profileImg} src={value.profile} alt="" />
          </div>

          <div className={styles.friendInfo}>
            <Text value="이메일" color="main" bold />
            <div style={{ margin: "1rem" }}></div>
            <Text value={value.email} />
          </div>

          <div className={styles.friendInfo}>
            <Text value="닉네임" color="main" bold />
            <div style={{ margin: "1rem" }}></div>
            <Text value={value.nickname} />
          </div>

          <div className={styles.friendInfo}>
            {/* <Text value="함께 공유한 여행 일정" color="main" bold />
            <div style={{ margin: "1rem" }}></div>
            <Text value="2" /> */}
          </div>
          <div className={styles.friendInfo}>
            <Button text="친구 삭제" onClick={() => onClickDeleteFriend(value.email)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MyFriendsList;
