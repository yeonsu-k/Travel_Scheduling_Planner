import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MySchedule.module.css";
import { Modal } from "@mui/material";
import Input from "components/Input";
import { emailRep } from "features/user/regist/Regist";
import ButtonStyled from "components/Button";
import { MyScheduleConfig } from "./MyScheduleList";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { InvitedFriendConfig } from "./MyScheduleShareModal";

interface MyScheduleInviteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: MyScheduleConfig;
  friends: InvitedFriendConfig[];
}

const MyScheduleInviteModal = ({ open, setOpen, item, friends }: MyScheduleInviteModalProps) => {
  const sendInvite = async (email: string) => {
    if (emailRep.test(email)) {
      await Axios.post(api.createSchedule.inviteFriend(), {
        scheduleId: item.schedule_id,
        email: email,
      })
        .then((res) => {
          console.log(res);
          alert("친구 초대가 완료되었습니다.");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("이메일 형식을 다시 확인하세요.");
      return;
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={styles.inviteModalContainer}>
        <span>마이로 친구 공유</span>
        <span>생성된 일정을 내 친구에게 공유합니다.</span>
        <div className={styles.invitedFriendsCont}>
          {friends.map((friend: InvitedFriendConfig, i: number) => (
            <div className={styles.invitedFriendItem} key={i}>
              <div>
                <div className={styles.friendImg}>
                  <img src={friend.profile} />
                </div>
                <span>{friend.email}</span>
              </div>
              <div>
                <ButtonStyled
                  width="80px"
                  text={friend.status}
                  color={friend.status == "초대" ? "main" : friend.status == "참여중" ? "pink" : "gray"}
                  disabled={friend.status != "초대"}
                  onClick={() => {
                    sendInvite(friend.email);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default MyScheduleInviteModal;
