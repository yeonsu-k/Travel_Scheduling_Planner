import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";
import { selectUserInfo, setUserInfo } from "slices/authSlice";
import { useAppSelector } from "app/hooks";
import api from "api/Api";
import { useDispatch } from "react-redux";
import Axios from "api/JsonAxios";
import { selectFriendNumber, setFriendNumber, setFriends } from "slices/friendSlice";

interface MyProfileProps {
  setViewSchedule: Dispatch<SetStateAction<boolean>>;
}

const MyProfile = ({ setViewSchedule }: MyProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const friendNumber = useAppSelector(selectFriendNumber);

  const getUserInfo = async () => {
    await Axios.get(api.user.user())
      .then((res: any) => {
        console.log(res.data.data.email);
        dispatch(
          setUserInfo({
            email: res.data.data.email,
          }),
        );
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const getFriendNumber = async () => {
    await Axios.get(api.friend.friend())
      .then((res) => {
        console.log(res);
        dispatch(setFriends(res.data.data.friends));
        dispatch(setFriendNumber(res.data.data.friends.length));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
    getFriendNumber();
  }, []);

  return (
    <div className={styles.myProfile}>
      <div className={styles.myProfileInfo}>
        <img className={styles.profileImg} src={sampleImg} />
      </div>

      <div className={styles.myProfileInfo}>
        <Text value={userInfo.nickname} type="pageTitle" bold />
      </div>
      <button className={styles.myProfileInfo} onClick={() => navigate("/profile")}>
        <Text value="프로필 수정" />
      </button>

      <div className={styles.myProfileInfo} onClick={() => setViewSchedule(true)}>
        <Text value="나의 일정" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value="0" type="pageTitle" bold />
      </div>

      <div className={styles.myProfileInfo} onClick={() => setViewSchedule(false)}>
        <Text value="나의 친구" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value={friendNumber.toString()} type="pageTitle" bold />
        <br />
      </div>
    </div>
  );
};

export default MyProfile;
