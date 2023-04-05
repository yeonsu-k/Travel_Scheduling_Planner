import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MySchedule.module.css";
import { Modal } from "@mui/material";
import Input from "components/Input";
import { emailRep } from "features/user/regist/Regist";
import ButtonStyled from "components/Button";
import { MyScheduleConfig } from "./MyScheduleList";
import Axios from "api/JsonAxios";
import api from "api/Api";

interface MyScheduleInviteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  item: MyScheduleConfig;
}

const MyScheduleInviteModal = ({ open, setOpen, item }: MyScheduleInviteModalProps) => {
  const [email, setEmail] = useState<string>("");
  const sendInvite = async () => {
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
        <span>이메일 공유</span>
        <span>생성된 일정을 친구 이메일을 통해 공유합니다.</span>
        <div className={styles.inviteInput}>
          <Input placeholder="E-Mail 주소 입력" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inviteSendBtn}>
          <ButtonStyled width="100px" height="40px" text="발송" onClick={sendInvite} />
        </div>
      </div>
    </Modal>
  );
};

export default MyScheduleInviteModal;
