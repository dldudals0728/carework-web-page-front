import { useLocation, useParams } from "react-router-dom";
import styles from "./DetailCategory.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EducationContext from "../components/EducationContext";

const contentInfo = {
  classinfo: {
    contentList: ["전체", "주간", "야간"],
  },
  exam: {
    contentList: ["전체", "38회", "39회", "40회", "41회"],
  },
  job: {
    contentList: [],
  },
  qna: {
    contentList: [],
  },
  notice: {
    contentList: [],
  },
};

function DetailCategory() {
  const tempContent = ["1번글", "2번글", "3번글", "4번글"];
  const params = useParams();
  const location = useLocation();
  const { pageState, setPageState } = useContext(EducationContext);
  console.log(params);
  console.log(location);

  const [category, setCategory] = useState("");
  const [menu, setMenu] = useState("전체");
  const [boardIndex, setBoardIndex] = useState(0);

  const showBoard = (event, idx) => {
    event.preventDefault();
    setBoardIndex((prev) => idx);
    console.log(boardIndex);
  };

  const changeMenu = (event) => {
    console.log(event.nativeEvent.target.innerHTML);
    setMenu(event.nativeEvent.target.innerHTML);
  };

  const getContent = () => {
    if (params.category === "classinfo") {
      return <h1>{params.category}</h1>;
    }
  };
  const content = getContent();

  const getBoardList = async () => {
    const res = await axios.get(
      IP + `/board/selectBoard?category=${params.category}`
    );
    console.log(res);
    if (res.data.status === 200) {
      setIsDuplicated(false);
      setConfirmedId(id);
    } else {
      console.log("중복!");
      setIsDuplicated(true);
      setConfirmedId(id);
    }
  };

  useEffect(() => {
    setCategory(params.category);
    location.state ? setMenu(location.state.section) : setMenu("전체");
  }, [params]);
  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
      />
      <div></div>
      <div className={styles.detail__container}>
        <div className={styles.detail__content__list}>
          <ul>
            {category !== "" &&
              contentInfo[category].contentList.map((c, idx) => (
                <li
                  key={idx}
                  style={{ color: menu === c ? "black" : "#c0c0c0" }}
                  onClick={changeMenu}
                >
                  {c}
                </li>
              ))}
          </ul>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            to={
              pageState.isLogin
                ? `/${params.education}/category/${category}/write`
                : `/${params.education}/login`
            }
            state={{ menu }}
          >
            <button type="button">글쓰기</button>
          </Link>
        </div>
        <div className={styles.detail__content__container}>
          <div className={styles.detail__content__title}>
            <div>번호</div>
            <div>제목</div>
            <div>글쓴이</div>
            <div>날짜</div>
            <div>조회</div>
          </div>
          <div style={{ width: "100%" }}>
            <ul className={styles.detail__contents}>
              {tempContent.map((c, idx) => (
                <Link
                  // to={`/${params.education}/category/${params.category}/${menu}/${idx}`}
                  onClick={(e) => showBoard(e, idx)}
                >
                  <li className={styles.detail__content} key={idx}>
                    <div>{idx + 1}</div>
                    <div>{c}</div>
                    <div>관리자</div>
                    <div>2022-11-19</div>
                    <div>7</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailCategory;
