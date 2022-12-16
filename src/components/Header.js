import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ROLE } from "../constant/Role";
import Dropdown from "./Dropdown";
import EducationContext from "./EducationContext";
import styles from "./Header.module.css";

function Header(props) {
  const edu = props.education;
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { pageState, setPageState } = useContext(EducationContext);
  const logout = () => {
    const prevPageState = { ...pageState };
    prevPageState.userName = "";
    prevPageState.isLogin = false;
    prevPageState.userName = "";
    prevPageState.classNumber = "";
    prevPageState.classTime = "";
    prevPageState.role = "";
    setPageState(prevPageState);
  };
  return (
    <div className={styles.header__container}>
      <div className={styles.account}>
        <ul className={`${styles.menu} ${styles.account__menu}`}>
          {props.role === "USER" && (
            <li>{`${pageState.classNumber}기 ${pageState.classTime}`}</li>
          )}
          {ROLE[props.role] >= 5 && <li style={{ color: "red" }}>관리자</li>}
          {props.isLogin ? (
            <li style={{ fontWeight: "bold" }}>
              환영합니다. {props.username}님!
            </li>
          ) : null}
          <li>
            <Link
              to={{
                pathname: `/${edu}/account`,
              }}
            >
              회원가입
            </Link>
          </li>

          <li>
            {props.isLogin ? (
              <Link
                to={{
                  pathname: `/${edu}`,
                  // state: { year, title, summary, poster, genres },
                }}
                onClick={logout}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                to={{
                  pathname: `/${edu}/login`,
                  // state: { year, title, summary, poster, genres },
                }}
              >
                로그인
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className={styles.logo}>
        {/* <h1>awsome page</h1> */}
        <Link to={`/${edu}`}>
          <img
            src={`${process.env.PUBLIC_URL}/nynoa.jpg`}
            alt="남양노아요양보호사교육원"
            className={styles.header__logo__img}
          />
        </Link>
      </div>
      <div>
        <nav>
          <ul className={`${styles.menu} ${styles.main__menu}`}>
            <li>
              {ROLE[props.role] >= 5 ? (
                <Link
                  to={`/${edu}/database/${props.role}`}
                  style={{ color: "red" }}
                >
                  DB 관리자 접속
                </Link>
              ) : (
                <Link to={`/${edu}`}>Home</Link>
              )}
            </li>
            <li>
              <Link to={`/${edu}/category/classinfo`}>개강 정보</Link>
            </li>
            <li>
              <Link to={`/${edu}/category/exam`}>시험 공지</Link>
            </li>
            <li>
              <Link to={`/${edu}/category/job`}>취업 게시판</Link>
            </li>
            <li>
              <Link to={`/${edu}/category/qna`}>Q&A</Link>
            </li>
            <li>
              <Link to={`/${edu}/category/notice`}>공지사항</Link>
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
