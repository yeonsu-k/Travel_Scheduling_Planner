import React, { useEffect, useState } from "react";
import styles from "./MySchedule.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import Input from "components/Input";
import { MyScheduleConfig } from "./MyScheduleList";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { DestinationConfig } from "slices/mainSlice";

const getDate = (data: string) => {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "." + month + "." + day;
};

const getDday = (data: string) => {
  const today = new Date();
  const target = new Date(data);
  // const target = new Date("Mar 31, 2023, 00:00:00");
  const gap = target > today ? target.getTime() - today.getTime() : today.getTime() - target.getTime();
  const result = Math.floor(gap / (1000 * 60 * 60 * 24));
  return result == 0 ? "D-DAY" : target > today ? `D-${result + 1}` : `D+${result}`;
  return result;
};

const MyScheduleListItem = (item: MyScheduleConfig) => {
  const [scheduleName, setScheduleName] = useState<string>(item.schedule_name);
  const [regionInfo, setRegionInfo] = useState<DestinationConfig>();

  const getRegionInfo = async () => {
    await Axios.get(api.createSchedule.getRegion(item.regionId))
      .then((res) => {
        setRegionInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyName = async () => {
    await Axios.post(api.user.schedule(item.schedule_id), {
      schedule_name: scheduleName,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePrivate = async () => {
    if (window.confirm(item.private ? "공개 일정으로 변경하시겠습니까?" : "비공개 일정으로 변경하시겠습니까?")) {
      await Axios.post(api.user.openSchedule(item.schedule_id))
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteSchedule = async () => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      await Axios.delete(api.user.schedule(item.schedule_id))
        .then((res) => {
          alert("일정이 삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getRegionInfo();
  }, []);

  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleImgContainer}>
          <img className={styles.scheduleImg} src={regionInfo?.regionImageURL} alt="지역 사진" />
          <div className={styles.scheduleInfo}>
            <Text value={regionInfo?.englishName} type="groupTitle" bold />
            <span className={styles.scheduleInfoRegion}>{regionInfo?.regionName}</span>
            <span className={styles.scheduleInfoEmail}>{item.host}</span>
          </div>
        </div>
        <div className={styles.scheduleContContainer}>
          <div className={styles.scheduleContent}>
            <div className={styles.scheduleContTitle}>
              <div className={styles.scheduleTextTop}>
                <span className={styles.scheduleTextTitle}>여행이름</span>
                <span className={styles.scheduleTextInput} style={{ color: "#666" }}>
                  <Input
                    value={scheduleName == "" ? "" : scheduleName}
                    placeholder={scheduleName == "" ? "여행이름" : ""}
                    onChange={(e) => setScheduleName(e.target.value)}
                  />
                </span>
                <div className={styles.scheduleEditNameBtn} onClick={modifyName}>
                  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="none"
                      stroke="#999"
                      d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"
                    ></path>
                    <polyline
                      fill="none"
                      stroke="#999"
                      points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"
                    ></polyline>
                  </svg>
                </div>
              </div>
              <div className={styles.scheduleTextTop}>
                <span className={styles.scheduleTextTitle}>최종수정</span>
                <span className={styles.scheduleTextCont}>{getDate(item.modifiedTime)}</span>
              </div>
            </div>
            <div className={styles.scheduleContTitle}>
              <div className={styles.scheduleTextBot}>
                <span className={styles.scheduleTextTitle}>여행일자</span>
                <span className={styles.scheduleTextCont}>
                  {item.start_day.replaceAll("-", ".")} - {item.end_day.replaceAll("-", ".")}
                </span>
              </div>
              <div className={styles.scheduleTextBot}>
                <span className={styles.scheduleTextTitle}>선택장소</span>
                <span className={styles.scheduleTextCont}>11</span>
              </div>
            </div>
          </div>
          <div className={styles.scheduleBtn}>
            <Button startIcon={item.private ? <LockOpenIcon /> : <LockIcon />} color="inherit" onClick={changePrivate}>
              {item.private ? "공개" : "비공개"}
            </Button>
            <ButtonStyled text="일정 수정" />
            <ButtonStyled text="일정 공유" />
            <ButtonStyled text="일정 삭제" onClick={deleteSchedule} />
          </div>
        </div>
        <div className={styles.scheduleDDAY}>{getDday(item.start_day)}</div>
      </div>
    </div>
  );
};

export default MyScheduleListItem;
