import React, { useEffect } from "react";
import styles from "./MyFriends.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import Button from "components/Button";
import { useAppSelector } from "app/hooks";
import { selectSearchUser } from "slices/friendSlice";
import Axios from "api/JsonAxios";
import api from "api/Api";

const MyFriendsSearchItem = () => {
  const searchUser = useAppSelector(selectSearchUser);

  const onClickRequestFrined = () => {
    Axios.post(api.friend.friend(), {
      email: searchUser.email,
    })
      .then((res: any) => {
        console.log(res);
        alert("친구요청 완료");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

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
            {searchUser.status === "친구요청" ? (
              <Button text="친구 요청" color="pink" radius onClick={onClickRequestFrined} />
            ) : searchUser.status === "요청완료" ? (
              <Button text={searchUser.status} disabled color="gray" radius onClick={onClickRequestFrined} />
            ) : (
              <Button text={searchUser.status} disabled color="main" radius onClick={onClickRequestFrined} />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyFriendsSearchItem;
