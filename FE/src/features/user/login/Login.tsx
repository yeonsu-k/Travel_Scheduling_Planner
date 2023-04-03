import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../../components/Input";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import LoginSocial from "./LoginSocial";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useDispatch } from "react-redux";
import { selectToken, setLogin, setUserInfo } from "slices/authSlice";
import Loading from "components/Loading";
import { useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import { rootState } from "app/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const token = useAppSelector(selectToken);
  const { login } = useSelector((state: rootState) => state.auth);

  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const kakaoLogin = async () => {
    if (code) {
      console.log("kakao login code: " + code);
      setLoading(true);
      await Axios.get(process.env.REACT_APP_API_BASE_URL + `/api/auth/kakao/login?code=${code}`)
        .then((res) => {
          dispatch(
            setLogin({
              accessToken: res.data.data.accessToken,
              nickname: res.data.data.nickname,
              login: true,
            }),
          );
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (error) {
      console.log("kakao login error: " + error);
    }
  };

  const emailCheck = (e: string) => {
    const rep = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!rep.test(e)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };

  const confirm = async () => {
    if (!isEmail) {
      console.log(isEmail);
      alert("잘못된 이메일 형식입니다.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      await Axios.post(api.auth.login(), {
        email: email,
        password: password,
      })
        .then((res: any) => {
          dispatch(
            setLogin({
              accessToken: res.data.data.accessToken,
              nickname: res.data.data.nickname,
              login: true,
            }),
          );
          dispatch(setUserInfo({ email: email, profile: res.data.data.profile }));
          setLoading(false);
          navigate("/");
        })
        .catch((err: any) => {
          const result = err.request.status;
          if (result === 401) {
            alert("이메일 또는 비밀번호가 일치하지 않습니다.");
          }
        });
    }
  };

  const moveRegist = () => {
    navigate("/regist");
  };

  useEffect(() => {
    kakaoLogin();
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.textTitle}>LOG IN</div>
          <div className={styles.smallText}>AI 여행 스케줄링 플래너 - MYRO</div>
          {login && !token ? (
            <div className={styles.tokenAlertText}>
              <Text value="토큰이 만료되었습니다. 다시 로그인해주세요." type="caption" color="cancle" />
            </div>
          ) : null}
          <div className={styles.inputTextContainer}>
            <label className={styles.inputText} htmlFor="name">
              이메일
            </label>
          </div>
          <Input
            type="text"
            name="email"
            placeholder=""
            onChange={(e) => {
              setEmail(e.target.value);
              emailCheck(e.target.value);
            }}
          />

          <div className={styles.inputTextContainer}>
            <label className={styles.inputText} htmlFor="name">
              비밀번호
            </label>
          </div>
          <Input type="password" name="email" placeholder="" onChange={(e) => setPassword(e.target.value)} />
          {/* <div style={{ marginTop: "10px", cursor: "pointer" }}>
        <Text color="day_8" value="비밀번호를 잊으셨나요?" type="caption" />
      </div> */}
          <div className={styles.btnContainer}>
            <Button color="main" text="로그인" width="100%" height="45px" radius onClick={confirm} />
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

          <LoginSocial />
        </div>
      </div>
    </>
  );
};

export default Login;
