import React, { useState } from "react";
import MyFriendsList from "./MyFriendsList";
import styles from "./MyFriends.module.css";
import Text from "components/Text";
import Modal from "components/Modal";
import MyFriendsSearch from "./MyFriendsSearch";
import { useAppDispatch } from "app/hooks";
import { resetSearchUser } from "slices/friendSlice";
import { friendProps } from "pages/MyPage";

export interface MyFriendsProps {
  friendList: Array<friendProps>;
}

const MyFriends = ({ friendList }: MyFriendsProps) => {
  const dispatch = useAppDispatch();

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

      {friendList.map((value, key) => (
        <MyFriendsList key={key} friendInfo={value} />
      ))}
    </div>
  );
};

export default MyFriends;
