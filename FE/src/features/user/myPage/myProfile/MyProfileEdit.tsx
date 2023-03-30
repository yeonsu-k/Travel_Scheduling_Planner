import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../../api/firebaseConfig";
import Input from "components/Input";
import Text from "components/Text";
import Button from "components/Button";
import styles from "./MyProfile.module.css";
import loginStyles from "../../login/Login.module.css";
import { selectUserInfo, setLogout, setUserInfo } from "slices/authSlice";
import { useAppSelector } from "app/hooks";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passRep } from "features/user/regist/Regist";
import EditIcon from "@mui/icons-material/Edit";

const MyProfileEdit = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false); // 새 비밀번호 형식
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false); // 맞는지

  const [newPic, setNewPic] = useState<Blob>();
  const [imgPreview, setImgPreview] = useState<string>("");

  /* firebase */
  const [imageURL, setImageURL] = useState<string>("");
  /* -- firebase */

  const passCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    passRep.test(newPassword) ? setIsPassword(true) : setIsPassword(false);
  };

  const passCheckConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === newPassword ? setIsPasswordConfirm(true) : setIsPasswordConfirm(false);
    console.log(isPasswordConfirm);
  };

  const handleImageUpload = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.click();
  }, []);

  const onUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files;
    const storageRef = ref(storage, `file/${file[0].name}`);
    const uploadTask = uploadBytes(storageRef, file[0]);

    uploadTask.then((snapshot) => {
      e.target.value = "";
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        onUploadProfile(downloadURL);
        setImgPreview(downloadURL);
      });
    });
  };

  const onUploadProfile = async (downloadURL: string) => {
    await Axios.post(api.user.editProfile(), {
      path: downloadURL,
    })
      .then((res) => {
        console.log(res);
        alert("프로필 이미지 변경이 완료되었습니다.");
        dispatch(setUserInfo({ profile: downloadURL }));
      })
      .catch((err) => {
        console.log(err);
      });
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
          alert("탈퇴가 완료되었습니다.");
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
          <div
            className={styles.profileImgContainer}
            style={{ backgroundColor: userInfo.profile || imgPreview ? "transparent" : "#63C6E6" }}
          >
            {imgPreview ? (
              <img src={imgPreview} alt="프리뷰" />
            ) : userInfo.profile ? (
              <img src={userInfo.profile} alt="프로필" />
            ) : (
              <div className={styles.profileImgText}>{userInfo.nickname.slice(0, 1)}</div>
            )}
            <input type="file" style={{ display: "none" }} ref={inputRef} onChange={onUploadImage} />
            <div className={styles.profileEditBtn} onClick={handleImageUpload}>
              <EditIcon fontSize="small" />
            </div>
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
            <Button width="100%" height="100%" text="취소하기" onClick={() => window.location.replace("/mypage")} />
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
