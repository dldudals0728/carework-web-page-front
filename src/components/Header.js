import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ROLE } from "../constant/Role";
import { IP_ADDRESS } from "../temp/IPAddress";
import Dropdown from "./Dropdown";
import EducationContext from "./EducationContext";
import styles from "./Header.module.css";

function Header(props) {
  const params = useParams();
  const edu = params.education;
  const IP = IP_ADDRESS;
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({
    address: "",
    classNumber: "",
    classTime: "",
    id: 0,
    name: "",
    password: "",
    phone: "",
    role: "",
    rrn: "",
    userId: "",
  });

  const logout = async () => {
    setIsLogin(false);
    setUserLogin({
      address: "",
      classNumber: "",
      classTime: "",
      id: 0,
      name: "",
      password: "",
      phone: "",
      role: "",
      rrn: "",
      userId: "",
    });
    const url = IP + "/account/logout";
    await axios.post(url);
  };

  const getLoginSession = async () => {
    const url = IP + "/account/getUserSession";
    const res = await axios
      .get(url)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          console.log(response.data);
          setUserLogin(response.data.login);
          setIsLogin(true);
        } else {
        }
      })
      .catch((error) => {
        console.log("header get session error!");
        console.log(error);
      });
  };
  useEffect(() => {
    getLoginSession();
    console.log(params);
  }, []);
  return (
    <div className={styles.header__container}>
      <div className={styles.account}>
        <ul className={`${styles.menu} ${styles.account__menu}`}>
          {userLogin.role === "USER" && (
            <li>{`${userLogin.classNumber}기 ${userLogin.classTime}`}</li>
          )}
          {ROLE[userLogin.role] >= 5 && (
            <li style={{ color: "red" }}>관리자</li>
          )}
          {isLogin ? (
            <li style={{ fontWeight: "bold" }}>
              환영합니다. {userLogin.name}님!
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
            {isLogin ? (
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
              {ROLE[userLogin.role] >= 5 ? (
                <Link
                  to={`/${edu}/database/${userLogin.role}`}
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
