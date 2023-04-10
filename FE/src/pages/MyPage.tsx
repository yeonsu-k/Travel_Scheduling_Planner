import React, { useEffect, useState } from "react";
import MyProfile from "features/user/myPage/myProfile/MyProfile";
import MySchedule from "features/user/myPage/mySchedule/MySchedule";
import MyFriends from "features/user/myPage/myFriends/MyFriends";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useAppDispatch } from "app/hooks";
import { setFriendCnt, setFriendList } from "slices/friendSlice";

function MyPage() {
  const dispatch = useAppDispatch();

  const [viewSchedule, setViewSchedule] = useState(true);
  const [scheduleColor, setScheduleColor] = useState("");
  const [friendColor, setfriendColor] = useState("");

  const getFriendInfo = async () => {
    await Axios.get(api.friend.friend()).then((res) => {
      dispatch(setFriendCnt(res.data.data.friends.length));
      dispatch(setFriendList(res.data.data.friends));
    });
  };

  useEffect(() => {
    getFriendInfo();
  }, []);

  useEffect(() => {
    setScheduleColor(viewSchedule ? "#98DDE3" : "#fff");
    setfriendColor(viewSchedule ? "#fff" : "#98DDE3");
  }, [viewSchedule]);

  return (
    <div>
      <MyProfile scheduleColor={scheduleColor} friendColor={friendColor} setViewSchedule={setViewSchedule} />
      {viewSchedule ? <MySchedule /> : <MyFriends />}
    </div>
  );
}

export default MyPage;
