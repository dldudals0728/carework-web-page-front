import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const IP = "http://172.16.229.102:8080";
  /**
   * 1. JSON.stringify 지워보기.
   */
  const login = async (e) => {
    // e.preventDefault();
    console.log(e.nativeEvent);
    e.preventDefault();
    const res = await axios
      .post(IP + "/account/login", {
        id: ID,
        password: password,
      })
      .then((response) => console.log(response));
  };
  return (
    <div className={styles.login__container}>
      <div className={styles.login__header}>
        <span>로그인</span>
      </div>
      <div className={styles.login__box}>
        <form
          action="http://172.16.229.102:8080/account/login"
          method="post"
          onSubmit={login}
        >
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
          <button type="submit">로그인</button>
        </form>
        <div className={styles.login__nav}>
          <nav className={styles.login__account}>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: "/account",
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
            pathname: "/",
          }}
        >
          메인으로 돌아가기
        </Link>
      </span>
    </div>
  );
}

export default Login;
