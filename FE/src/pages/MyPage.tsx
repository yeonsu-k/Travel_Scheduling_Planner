import React, { useEffect, useState } from "react";
import MyProfile from "features/user/myPage/myProfile/MyProfile";
import MySchedule from "features/user/myPage/mySchedule/MySchedule";
import MyFriends from "features/user/myPage/myFriends/MyFriends";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useAppDispatch } from "app/hooks";
import { setFriendCnt } from "slices/friendSlice";

export interface friendProps {
  profile: string;
  email: string;
  nickname: string;
}

let friendNumber = 0;
let friendList: Array<friendProps> = [];

function MyPage() {
  const dispatch = useAppDispatch();

  const [viewSchedule, setViewSchedule] = useState(true);
  const [scheduleColor, setScheduleColor] = useState("");
  const [friendColor, setfriendColor] = useState("");

  const getFriendCnt = async () => {
    await Axios.get(api.friend.friend())
      .then((res) => {
        dispatch(setFriendCnt(res.data.data.friends.length));
        friendList = [...res.data.data.friends];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFriendCnt();
  }, []);

  useEffect(() => {
    setScheduleColor(viewSchedule ? "#98DDE3" : "#fff");
    setfriendColor(viewSchedule ? "#fff" : "#98DDE3");
  }, [viewSchedule]);

  return (
    <div>
      <MyProfile scheduleColor={scheduleColor} friendColor={friendColor} setViewSchedule={setViewSchedule} />
      {viewSchedule ? <MySchedule /> : <MyFriends friendList={friendList} />}
    </div>
  );
}

export default MyPage;

export const getFriendInfo = async () => {
  await Axios.get(api.friend.friend())
    .then((res) => {
      friendNumber = res.data.data.friends.length;
      console.log("friendNumber", friendNumber);
      friendList = [...res.data.data.friends];
    })
    .catch((err) => {
      console.log(err);
    });
};
