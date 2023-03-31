import React, { useEffect, useState } from "react";
import MyProfile from "features/user/myPage/myProfile/MyProfile";
import MySchedule from "features/user/myPage/mySchedule/MySchedule";
import MyFriends from "features/user/myPage/myFriends/MyFriends";
import Axios from "api/JsonAxios";
import api from "api/Api";

export interface friendProps {
  profile: string;
  email: string;
  nickname: string;
}

let friendNumber = 0;
let friendList: Array<friendProps> = [];

function MyPage() {
  const [viewSchedule, setViewSchedule] = useState(true);

  useEffect(() => {
    getFriendInfo();
  }, []);

  return (
    <div>
      <MyProfile setViewSchedule={setViewSchedule} friendNumber={friendNumber}/>
      {viewSchedule ? <MySchedule /> : <MyFriends friendList={friendList} />}
    </div>
  );
}

export default MyPage;

export const getFriendInfo = async () => {
  await Axios.get(api.friend.friend())
    .then((res) => {
      friendNumber = res.data.data.friends.length;
      friendList = [...res.data.data.friends];
    })
    .catch((err) => {
      console.log(err);
    });
};
