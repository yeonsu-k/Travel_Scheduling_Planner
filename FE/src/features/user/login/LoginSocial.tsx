import Text from "components/Text";
import React from "react";
import styles from "./Login.module.css";

const LoginSNS = () => {
  return (
    <div className={styles.socialContainer}>
      <span>SNS 간편 로그인</span>
      <div className={styles.socialBtnContainer}>
        <div className={styles.socialBtn}>
          <img src="https://www.myro.co.kr/myro_image/kakaolink_btn.png" />
        </div>
        <div className={styles.socialBtn}>
          <img src="https://www.myro.co.kr/myro_image/naver_btn.png" />
        </div>
        <div className={styles.socialBtn}>
          <img src="https://www.myro.co.kr/myro_image/google_btn.png" />
        </div>
      </div>
    </div>
  );
};

export default LoginSNS;
