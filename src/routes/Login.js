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
  /**
   * 1. JSON.stringify 지워보기.
   */
  const login = async (e) => {
    // e.preventDefault();
    e.preventDefault();
    const url = IP + "/account/login";
    const res = await axios
      .post(
        url,
        {
          id: ID,
          password: password,
        },
        // config 설정이 없어도 쿠키가 잘 저장되는거 같은데 ?
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
        }
      )
      .then((response) => {
        if (response.data.status === 500) {
          setIsWrong(true);
        } else if (response.data.status === 200) {
          console.log(response);
          setIsWrong(false);
          navigate(`/${edu}`);
        }
      })
      .catch((error) => {
        setIsWrong(true);
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
