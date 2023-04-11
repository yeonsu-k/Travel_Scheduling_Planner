import Axios from "api/JsonAxios";
import Text from "components/Text";
import React from "react";
import styles from "./Login.module.css";

const LoginSNS = () => {
  const getUrl = async () => {
    await Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/auth/kakao/code")
      .then((res: any) => {
        console.log(res);
        window.location.href = res.data.data.url;
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.socialContainer}>
      <span>SNS 간편 로그인</span>
      <div className={styles.socialBtnContainer}>
        <div className={styles.socialBtn} onClick={getUrl}>
          <img src="https://www.myro.co.kr/myro_image/kakaolink_btn.png" />
        </div>
        {/* <div className={styles.socialBtn}>
          <img src="https://www.myro.co.kr/myro_image/naver_btn.png" />
        </div>
        <div className={styles.socialBtn}>
          <img src="https://www.myro.co.kr/myro_image/google_btn.png" />
        </div> */}
      </div>
    </div>
  );
};

export default LoginSNS;
