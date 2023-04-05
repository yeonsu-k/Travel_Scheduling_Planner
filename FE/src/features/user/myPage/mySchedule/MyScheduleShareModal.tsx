import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MySchedule.module.css";
import { Modal } from "@mui/material";
import { DestinationConfig } from "slices/mainSlice";
import ButtonStyled from "components/Button";
import MyScheduleInviteModal from "./MyScheduleInviteModal";
import { MyScheduleConfig } from "./MyScheduleList";
import Axios from "api/JsonAxios";
import api from "api/Api";

interface MyScheduleShareModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  regionInfo?: DestinationConfig;
  item: MyScheduleConfig;
}

interface InvitedFriendConfig {
  email: string;
  nickname: string;
  profile: string;
  status: string;
}

const MyScheduleShareModal = ({ open, setOpen, regionInfo, item }: MyScheduleShareModalProps) => {
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const [invitedList, setInvitedList] = useState<InvitedFriendConfig[]>([]);
  const invitedFriend = async () => {
    await Axios.get(api.createSchedule.invitedFriend(item.schedule_id))
      .then((res) => {
        console.log(res.data.data.friends);
        setInvitedList(res.data.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredInvitedList = invitedList.filter((item: InvitedFriendConfig) => {
    return item.status == "참여중";
  });

  useEffect(() => {
    console.log("ON");
    invitedFriend();
  }, []);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={styles.shareModalContainer}>
          <span>{regionInfo?.englishName}</span>
          <span>나의 여행 일정 공유</span>
          <div className={styles.shareBtn}>
            <ButtonStyled width="150px" height="50px" text="마이로 친구 공유" onClick={() => setEmailModal(true)} />
            <ButtonStyled width="150px" height="50px" text="카카오톡 공유" />
          </div>
          <MyScheduleInviteModal open={emailModal} setOpen={setEmailModal} item={item} />
          <span>공유된 친구</span>
          <table className={styles.shareModalTable}>
            <thead>
              <tr>
                <th>닉네임</th>
                <th>ID OR EMAIL</th>
                <th>관리</th>
              </tr>
              {filteredInvitedList.map((item: InvitedFriendConfig, i: number) => (
                <tr key={i}>
                  <td>{item.nickname}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default MyScheduleShareModal;
