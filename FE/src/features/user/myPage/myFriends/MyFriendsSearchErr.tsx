import React from "react";
import styles from "./MyFriends.module.css";
import turtle from "asset/turtle.svg";
import Text from "components/Text";

interface MyFriendsSearchErrProps {
  type: string;
}

const MyFriendsSearchErr = ({ type }: MyFriendsSearchErrProps) => {
  return (
    <div className={styles.myFriendsSearchErr}>
      <img className={styles.turtleImg} src={turtle} />

      {type === "사용자" ? (
        <>
          <div style={{ margin: "1%" }}></div>
          <Text value="검색 결과와 일치하는 사용자가 없어요." type="caption" color="darkgray" />
          <div style={{ margin: "0.5%" }}></div>
          <Text value="입력한 이메일을 다시 한 번 확인해주세요." type="caption" color="darkgray" />
        </>
      ) : (
        <>
          <div style={{ margin: "2%" }}></div>
          <Text value="이메일 형식으로 입력해주세요." type="caption" color="darkgray" />
        </>
      )}
    </div>
  );
};

export default MyFriendsSearchErr;
