import React, { useEffect, useState } from "react";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Button from "components/Button";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { friendProps, setFriendCnt, setFriendList } from "slices/friendSlice";
import { useAppDispatch } from "app/hooks";
import Loading from "components/Loading";
import DeleteItemModal from "features/schedule/edit/fullList/DeleteItemModal";

interface MyFriendsListProps {
  friendInfo: friendProps;
}

const MyFriendsList = ({ friendInfo }: MyFriendsListProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [deleteFriendModal, setDeleteFriendModal] = useState(false);

  const onClickDeleteFriend = async () => {
    await Axios.delete(api.friend.friend(), {
      data: {
        email: friendInfo.email,
      },
    })
      .then((res) => {
        console.log(res);
        // const index = friends.findIndex((idx) => idx.email === friendInfo.email);
        // const tmpList = [...friends];
        // tmpList.splice(index, 1);

        // console.log("tmpList", tmpList);
        // dispatch(setFriendList([...tmpList]));

        // console.log("friendList", friends);
        setDeleteFriendModal(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFriendInfo = async () => {
    setLoading(true);
    await Axios.get(api.friend.friend())
      .then((res) => {
        dispatch(setFriendCnt(res.data.data.friends.length));
        dispatch(setFriendList(res.data.data.friends));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriendInfo();
  }, []);

  return (
    <div className={styles.myFriendsList}>
      {loading ? <Loading /> : null}
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
        <Button text="친구 삭제" onClick={() => setDeleteFriendModal(true)} />
      </div>

      {deleteFriendModal && (
        <DeleteItemModal onClickDeleteItem={onClickDeleteFriend} setDeleteItemModal={setDeleteFriendModal} />
      )}
    </div>
  );
};

export default MyFriendsList;
