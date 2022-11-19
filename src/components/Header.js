import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import styles from "./Header.module.css";

function Header() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  return (
    <div className={styles.header__container}>
      <div className={styles.account}>
        <ul className={`${styles.menu} ${styles.account__menu}`}>
          <li>
            <Link
              to={{
                pathname: "/account",
              }}
            >
              회원가입
            </Link>
          </li>

          <li>
            <Link
              to={{
                pathname: "/login",
                // state: { year, title, summary, poster, genres },
              }}
            >
              로그인
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.logo}>
        <h1>awsome page</h1>
      </div>
      <div>
        <nav>
          <ul className={`${styles.menu} ${styles.main__menu}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category/classinfo" state={{ contentList: "a" }}>
                개강 정보
              </Link>
            </li>
            <li>
              <Link to="/category/exam">시험 공지</Link>
            </li>
            <li>
              <Link to="/category/job">취업 게시판</Link>
            </li>
            <li>
              <Link to="/category/qna">Q&A</Link>
            </li>
            <li>
              <Link to="/category/notice">공지사항</Link>
            </li>
            {/* <li>전체메뉴</li> */}
          </ul>
          <Dropdown visibility={dropdownVisibility}>
            <ul>
              <li>주간반</li>
              <li>야간반</li>
            </ul>
          </Dropdown>
        </nav>
      </div>
    </div>
  );
}

export default Header;
