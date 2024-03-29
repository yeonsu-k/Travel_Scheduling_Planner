import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./MyProfile.module.css";
import sampleImg from "asset/sample/cat.png";
import Text from "components/Text";
import { useNavigate } from "react-router-dom";
import { selectUserInfo, setUserInfo } from "slices/authSlice";
import { useAppSelector } from "app/hooks";
import api from "api/Api";
import { useDispatch } from "react-redux";
import Axios from "api/JsonAxios";
import { selectScheduleCnt } from "slices/mainSlice";
import { selectFriendCnt } from "slices/friendSlice";

interface MyProfileProps {
  scheduleColor: string;
  friendColor: string;
  setViewSchedule: Dispatch<SetStateAction<boolean>>;
}

const MyProfile = ({ scheduleColor, friendColor, setViewSchedule }: MyProfileProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const scheduleNumber = useAppSelector(selectScheduleCnt);
  const friendNumber = useAppSelector(selectFriendCnt);

  const getUserInfo = async () => {
    await Axios.get(api.user.user())
      .then((res: any) => {
        dispatch(
          setUserInfo({
            email: res.data.data.email,
            profile: res.data.data.profile,
          }),
        );
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.myProfile}>
      <div className={styles.myProfileInfo}>
        <div
          className={styles.profileImgContainer}
          style={{ backgroundColor: userInfo.profile ? "transparent" : "#63C6E6" }}
        >
          {userInfo.profile ? (
            <img src={userInfo.profile} alt="프로필" />
          ) : (
            <div className={styles.profileImgText}>{userInfo.nickname.slice(0, 1)}</div>
          )}
        </div>
      </div>

      <div className={styles.myProfileInfo}>
        <Text value={userInfo.nickname} type="pageTitle" bold />
      </div>
      <button className={styles.myProfileInfo} onClick={() => navigate("/profile")}>
        <Text value="프로필 수정" />
      </button>

      <div
        className={styles.myProfileInfo}
        onClick={() => setViewSchedule(true)}
        style={{ backgroundColor: scheduleColor }}
      >
        <Text value="나의 일정" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value={scheduleNumber.toString()} type="pageTitle" bold />
      </div>

      <div
        className={styles.myProfileInfo}
        onClick={() => setViewSchedule(false)}
        style={{ backgroundColor: friendColor }}
      >
        <Text value="나의 친구" type="text" bold en />
        <div style={{ margin: "15%" }}></div>
        <Text value={friendNumber.toString()} type="pageTitle" bold />
        <br />
      </div>
    </div>
  );
};

export default MyProfile;
