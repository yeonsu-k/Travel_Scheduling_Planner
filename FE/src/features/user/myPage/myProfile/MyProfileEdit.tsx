import React, { ChangeEvent, useEffect, useState } from "react";
import Input from "components/Input";
import Text from "components/Text";
import Button from "components/Button";
import styles from "./MyProfile.module.css";
import loginStyles from "../../login/Login.module.css";
import { selectUserInfo, setLogout } from "slices/authSlice";
import { useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passRep } from "features/user/regist/Regist";

const MyProfileEdit = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false); // 새 비밀번호 형식
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false); // 맞는지

  const passCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    passRep.test(newPassword) ? setIsPassword(true) : setIsPassword(false);
  };

  const passCheckConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === newPassword ? setIsPasswordConfirm(true) : setIsPasswordConfirm(false);
    console.log(isPasswordConfirm);
  };

  const saveInfo = async () => {
    console.log(newPassword);
    if (password != "") {
      if (isPassword && isPasswordConfirm) {
        await Axios.post(api.user.user(), {
          nickname: nickname,
          password: password,
          newPassword: newPassword,
        })
          .then((res: any) => {
            if (res.data.success) {
              alert("정보 수정이 완료되었습니다.");
              navigate("/mypage");
            }
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err.request.status);
            if (err.request.status === 403) {
              alert("비밀번호가 틀립니다.");
            }
          });
      } else if (!isPassword) alert("비밀번호 형식을 확인해주세요.");
      else if (!isPasswordConfirm) alert("비밀번호를 확인해주세요.");
    } else {
      alert("닉네임 변경하려면 비밀번호도 바꿔야 함.");
    }
  };

  const userLeave = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      await Axios.delete(api.user.user())
        .then((res: any) => {
          console.log(res);
          dispatch(setLogout());
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileContainer}>
        <div className={styles.profileTopContainer}>
          <div className={styles.profileImgContainer}>
            <div className={styles.profileImgText}>{userInfo.nickname.slice(0, 1)}</div>
          </div>
          <div className={styles.profileUser}>
            <Text value={userInfo.nickname} type="pageTitle" bold />
          </div>
          <div className={styles.text}>님의 프로필</div>
        </div>
        <div className={styles.profileBotContainer}>
          <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfoTitleContainer}>
              <div className={styles.profileInfoTitle}>
                <Text value="기본정보" type="text" bold />
              </div>
            </div>
            <div className={loginStyles.inputTextContainer}>
              <label className={loginStyles.inputText} style={{ color: "black" }} htmlFor="name">
                닉네임
              </label>
            </div>
            <Input
              type="text"
              name="email"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <div className={loginStyles.inputTextContainer}>
              <label className={loginStyles.inputText} style={{ color: "black" }} htmlFor="name">
                이메일
              </label>
            </div>
            <Input type="text" name="email" value={userInfo.email} disabled />
          </div>

          <div className={styles.profileInfoContainer}>
            <div className={styles.profileInfoTitleContainer}>
              <div className={styles.profileInfoTitle}>
                <Text value="비밀번호" type="text" bold />
              </div>
            </div>
            <div className={loginStyles.inputTextContainer}>
              <label className={loginStyles.inputText} style={{ color: "black" }} htmlFor="name">
                기존 비밀번호
              </label>
            </div>
            <Input type="password" name="pre_password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
            <div className={loginStyles.inputTextContainer}>
              <label className={loginStyles.inputText} style={{ color: "black" }} htmlFor="name">
                새 비밀번호
              </label>
            </div>
            <Input
              type="password"
              name="cur_password"
              placeholder=""
              onChange={(e) => {
                passCheck(e);
              }}
            />
            <div className={loginStyles.inputTextContainer}>
              <label className={loginStyles.inputText} style={{ color: "black" }} htmlFor="name">
                새 비밀번호 확인
              </label>
            </div>
            <Input type="password" name="cur_password" placeholder="" onChange={(e) => passCheckConfirm(e)} />
          </div>
        </div>
        <div className={styles.profileLeave} onClick={userLeave}>
          회원탈퇴
        </div>

        <div className={styles.profileBtnContainer}>
          <div className={styles.profileBtn}>
            <Button width="100%" height="100%" text="취소하기" />
          </div>
          <div className={styles.profileBtn}>
            <Button width="100%" height="100%" text="저장하기" onClick={saveInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;
