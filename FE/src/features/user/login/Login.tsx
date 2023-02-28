import React from "react";
import styles from "./Login.module.css";
import Input from "../../../components/Input";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import LoginSNS from "./LoginSocial";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const moveRegist = () => {
    navigate("/regist");
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.textTitle}>LOG IN</div>
        <div className={styles.smallText}>AI 여행 스케줄링 플래너 - MYRO</div>
        <div className={styles.inputTextContainer}>
          <label className={styles.inputText} htmlFor="name">
            이메일
          </label>
        </div>
        <Input type="text" name="email" placeholder="" />

        <div className={styles.inputTextContainer}>
          <label className={styles.inputText} htmlFor="name">
            비밀번호
          </label>
        </div>
        <Input type="text" name="email" placeholder="" />
        <div style={{ marginTop: "10px", cursor: "pointer" }}>
          <Text color="day_8" value="비밀번호를 잊으셨나요?" type="caption" />
        </div>
        <div className={styles.btnContainer}>
          <Button color="main" text="로그인" width="100%" height="45px" radius />
        </div>
        <div className={styles.textContainer}>
          <Text value="회원이 아니세요?" type="caption" />
          <div style={{ marginLeft: "5px", cursor: "pointer" }} onClick={moveRegist}>
            <Text color="day_8" value="회원가입하기" type="caption" />
          </div>
        </div>
        <div className={styles.dividerContainer}>
          <div className={styles.divider}></div>
          <span>or</span>
        </div>
        <LoginSNS />
      </div>
    </div>
  );
};

export default Login;
