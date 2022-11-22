import { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IP_ADDRESS } from "../temp/IPAddress";
import EducationContext from "../components/EducationContext";

function Login() {
  const params = useParams();
  const edu = params.education;
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const IP = IP_ADDRESS;
  const { pageState, setPageState } = useContext(EducationContext);
  const changeLoginState = (isLogin) => {
    const prevPageState = { ...pageState };
    prevPageState.isLogin = isLogin;
    setPageState(prevPageState);
  };
  /**
   * 1. JSON.stringify 지워보기.
   */
  const login = async (e) => {
    // e.preventDefault();
    console.log(e.nativeEvent);
    e.preventDefault();
    console.log("login function");
    const res = await axios
      .post(IP + "/account/login", {
        id: ID,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 490) {
          setIsWrong(true);
          console.log("아이디 또는 비밀번호 오류입니다.");
          changeLoginState(false);
        } else {
          setIsWrong(false);
          console.log(`환영합니다. ${response.data.userName}님!`);
          navigate(`/${edu}`);
          changeLoginState(true);
        }
      });
  };

  useEffect(() => {
    return () => setIsWrong(false);
  }, []);
  return (
    <div className={styles.login__container}>
      <div className={styles.login__header}>
        <span>로그인</span>
      </div>
      <div className={styles.login__box}>
        <form action={`${IP}/account/login`} method="post" onSubmit={login}>
          <label className={styles.login__label}>
            <div className={styles.login__text}>아이디</div>
            <input
              className={styles.login__input}
              type="text"
              placeholder="ID"
              value={ID}
              onChange={(e) => setID(e.target.value)}
              name="id"
            />
          </label>
          <label className={styles.login__label}>
            <div className={styles.login__text}>비밀번호</div>
            <input
              className={styles.login__input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </label>
          <span
            className={styles.login__validate}
            style={{ display: isWrong ? "inline" : "none" }}
          >
            아이디 또는 비밀번호 오류입니다.
          </span>
          <button type="submit">로그인</button>
        </form>
        <div className={styles.login__nav}>
          <nav className={styles.login__account}>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/${edu}/account`,
                  }}
                >
                  회원가입
                </Link>
              </li>
              <li>아이디/비밀번호 찾기</li>
            </ul>
          </nav>
        </div>
      </div>
      <span>
        <Link
          to={{
            pathname: `/${edu}`,
          }}
        >
          메인으로 돌아가기
        </Link>
      </span>
    </div>
  );
}

export default Login;
