import { useLocation, useParams } from "react-router-dom";
import styles from "./DetailCategory.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import { IP_ADDRESS } from "../temp/IPAddress";
import axios from "axios";

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
  const params = useParams();
  const location = useLocation();
  const IP = IP_ADDRESS;
  const { pageState, setPageState } = useContext(EducationContext);

  const [category, setCategory] = useState("");
  const [menu, setMenu] = useState("전체");
  const [boardIndex, setBoardIndex] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const showBoard = (event, idx) => {
    event.preventDefault();
    setBoardIndex((prev) => idx);
  };

  const changeMenu = (event) => {
    setMenu(event.nativeEvent.target.innerHTML);
  };

  const getBoardList = async () => {
    let res;
    if (menu === "전체") {
      res = await axios.get(
        IP + `/board/selectBoard?category=${params.category}`
      );
    } else {
      res = await axios.get(
        IP + `/board/selectBoard?category=${params.category}&section=${menu}`
      );
    }
    if (res.data.status === 200) {
      const newBoardList = res.data.boardList;
      newBoardList.forEach(
        (value) =>
          (value.publishedDate = `${new Date(
            value.publishedDate
          ).getFullYear()}-${
            new Date(value.publishedDate).getMonth() + 1
          }-${new Date(value.publishedDate).getDate()}`)
      );
      setBoardList(newBoardList);
    } else {
    }
  };

  useEffect(() => {
    getBoardList();
  }, [menu]);

  useEffect(() => {
    setCategory(params.category);
    location.state ? setMenu(location.state.section) : setMenu("전체");
    getBoardList();
  }, [params]);
  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
        role={pageState.role}
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
            state={pageState.isLogin ? { menu } : null}
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
              {boardList.map((board, idx) => (
                <Link
                  to={`/${params.education}/category/${params.category}/${board.id}`}
                  // onClick={(e) => showBoard(e, idx)}
                  // onClick={gettingReady}
                  key={idx}
                >
                  <li className={styles.detail__content} key={idx}>
                    <div>{idx + 1}</div>
                    <div>{board.title}</div>
                    <div>{board.writer}</div>
                    <div>{board.publishedDate}</div>
                    <div>준비중입니다.</div>
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
