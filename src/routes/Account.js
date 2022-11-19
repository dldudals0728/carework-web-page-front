import { useState } from "react";
import styles from "./Account.module.css";
import Footer from "../components/Footer";

function Account() {
  const [name, setName] = useState("");
  const [frontRRN, setFrontRRN] = useState("");
  const [backRRN, setBackRRN] = useState("");
  const [id, setId] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  return (
    <div>
      <div className={styles.account__container}>
        <div className={styles.account__indicator}>
          <span>기관장 또는 원장</span>
          <span>수강생</span>
        </div>
        <span>회원가입</span>
        <div className={styles.account__form}>
          <form>
            <label>
              <div className={styles.account__text}>* 이름</div>
              <input
                className={styles.account__input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="이름"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 주민등록번호</div>
              <div>
                <input
                  className={styles.account__input}
                  value={frontRRN}
                  onChange={(e) => setFrontRRN(e.target.value)}
                  type="text"
                  name="frontRRN"
                  placeholder=""
                />{" "}
                -{" "}
                <input
                  className={styles.account__input}
                  value={backRRN}
                  onChange={(e) => setBackRRN(e.target.value)}
                  type="password"
                  name="backRRN"
                  placeholder=""
                />
              </div>
            </label>
            <label>
              <div className={styles.account__text}>* 아이디</div>
              <input
                className={styles.account__input}
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                name="id"
                placeholder="ID"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 비밀번호</div>
              <input
                className={styles.account__input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="비밀번호"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 비밀번호 확인</div>
              <input
                className={styles.account__input}
                value={checkPwd}
                onChange={(e) => setCheckPwd(e.target.value)}
                type="password"
                name="checkPwd"
                placeholder="비밀번호 확인"
              />
            </label>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
