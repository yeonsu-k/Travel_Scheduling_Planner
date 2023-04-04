import React, { useEffect, useState } from "react";
import MyFriendsList from "./MyFriendsList";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Modal from "components/Modal";
import MyFriendsSearch from "./MyFriendsSearch";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { resetSearchUser, selectFriendList, setFriendList } from "slices/friendSlice";

const MyFriends = () => {
  const dispatch = useAppDispatch();

  const [friends, setFriends] = useState(useAppSelector(selectFriendList));
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);

  const showAddFriendModal = () => {
    setOpenAddFriendModal(true);
    dispatch(resetSearchUser());
  };

  return (
    <div className={styles.myFriends}>
      <div className={styles.myFriendsTitle}>
        <button className={styles.addFriendsButton} onClick={showAddFriendModal}>
          <Text value="친구 추가하기" color="white" bold />
        </button>
        {openAddFriendModal ? (
          <Modal title="친구 검색하기" modalClose={() => setOpenAddFriendModal(false)}>
            <MyFriendsSearch />
          </Modal>
        ) : (
          <></>
        )}
      </div>

      {friends.map((value, key) => (
        <MyFriendsList key={key} friendInfo={value} />
      ))}
    </div>
  );
};

export default MyFriends;
