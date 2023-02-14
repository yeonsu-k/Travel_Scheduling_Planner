import React, { useState } from "react";
import MyProfile from "features/user/myPage/myProfile/MyProfile";
import MySchedule from "features/user/myPage/mySchedule/MySchedule";
import MyFriends from "features/user/myPage/myFriends/MyFriends";

function MyPage() {
  const [viewSchedule, setViewSchedule] = useState(true);

  return (
    <div>
      <MyProfile setViewSchedule={setViewSchedule} />
      {viewSchedule ? <MySchedule /> : <MyFriends />}
    </div>
  );
}

export default MyPage;
