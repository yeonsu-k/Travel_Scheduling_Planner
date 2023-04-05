import React, { useState } from "react";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import MyFriendsSearchItem from "./MyFriendsSearchItem";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useAppDispatch } from "app/hooks";
import { setSearchUser } from "slices/friendSlice";
import MyFriendsSearchErr from "./MyFriendsSearchErr";

const MyFriendsSearch = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [type, setType] = useState("");

  const onClickSearchUser = () => {
    console.log(email);

    Axios.post(api.friend.searchUser(), {
      email: email,
    })
      .then((res) => {
        console.log(res);

        if (res.data.data.email !== null) {
          setIsUser(true);
          const searchData = {
            email: res.data.data.email,
            exist: res.data.data.exist,
            nickname: res.data.data.nickname,
            profile: res.data.data.profile,
            status: res.data.data.status,
            success: res.data.success,
          };
          dispatch(setSearchUser(searchData));
        } else {
          setIsUser(false);
          setType("사용자");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setIsUser(false);
          setType("이메일");
        }
      });
  };

  return (
    <div className={styles.myFriendsAdd}>
      <div className={styles.titleText}>
        <div className={styles.designBox}></div>
        <Text value="사용자 이메일을 정확히 입력해주세요." type="text" />
      </div>

      <div className={styles.inputBox}>
        <div className={styles.emailInput}>
          <Input name="emailInput" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button text="검색" color="main" radius onClick={onClickSearchUser} />
      </div>

      {isUser ? <MyFriendsSearchItem /> : <MyFriendsSearchErr type={type} />}
    </div>
  );
};

export default MyFriendsSearch;
