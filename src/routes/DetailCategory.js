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
  const [boardPage, setBoardPage] = useState({});
  const [boardPageList, setBoardPageList] = useState([]);
  const [currentBoardPage, setCurrentBoardPage] = useState(0);

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
      const newBoardList = [...res.data.boardList.content];
      newBoardList.forEach(
        (value) =>
          (value.publishedDate = `${new Date(
            value.publishedDate
          ).getFullYear()}-${
            new Date(value.publishedDate).getMonth() + 1
          }-${new Date(value.publishedDate).getDate()}`)
      );

      const boardPageInfo = { ...res.data.boardList };
      delete boardPageInfo.content;
      setBoardList(newBoardList);
      setBoardPage(boardPageInfo);
      const boardPages = Array.from(
        { length: Math.min(Math.max(boardPageInfo.totalPages, 1), 5) },
        (value, index) => index + 1
      );
      setBoardPageList(boardPages);
      setCurrentBoardPage(0);
    } else {
    }
  };

  const changeBoardPage = async () => {
    let res;
    let url;
    if (menu === "전체") {
      url = IP + `/board/selectBoard?category=${params.category}`;
    } else {
      url =
        IP + `/board/selectBoard?category=${params.category}&section=${menu}`;
    }
    url += `&size=10&page=${currentBoardPage}`;
    res = await axios.get(url);

    if (res.data.status === 200) {
      const newBoardList = res.data.boardList.content;
      newBoardList.forEach(
        (value) =>
          (value.publishedDate = `${new Date(
            value.publishedDate
          ).getFullYear()}-${
            new Date(value.publishedDate).getMonth() + 1
          }-${new Date(value.publishedDate).getDate()}`)
      );

      setBoardList(newBoardList);
      const pageGroup = parseInt(currentBoardPage / 5);
      const boardPages = Array.from(
        { length: Math.min(boardPage.totalPages, 5) },
        (value, index) => pageGroup * 5 + index + 1
      );
      setBoardPageList(boardPages);
    } else {
    }
  };

  const changeCurrentPage = (page) => {
    if (page < 0) {
      page = 0;
    } else if (page >= boardPage.totalPages) {
      page = boardPage.totalPages - 1;
    }
    setCurrentBoardPage(page);
  };

  useEffect(() => {
    changeBoardPage();
  }, [currentBoardPage]);

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
                ? `/${params.education}/category/${category}/insert`
                : `/${params.education}/login`
            }
            state={pageState.isLogin ? { menu, mode: "insert" } : null}
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
                  to={`/${params.education}/category/${params.category}/detail/${board.id}`}
                  // onClick={(e) => showBoard(e, idx)}
                  // onClick={gettingReady}
                  key={idx}
                >
                  <li className={styles.detail__content} key={idx}>
                    <div>{idx + 1}</div>
                    <div>{board.title}</div>
                    <div>{board.writer}</div>
                    <div>{board.publishedDate}</div>
                    <div>{board.viewCount}</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <li
                className={styles.detail__page_btn}
                onClick={() => changeCurrentPage(0)}
                style={{
                  color: currentBoardPage === 0 ? "#c0c0c0" : "black",
                }}
              >{`< <`}</li>
              <li
                className={styles.detail__page_btn}
                style={{
                  color: currentBoardPage === 0 ? "#c0c0c0" : "black",
                }}
                onClick={() => changeCurrentPage(currentBoardPage - 1)}
              >{`<`}</li>
              {boardPageList.map((pageNumber, index) => (
                <li
                  key={pageNumber}
                  className={styles.detail__page_btn}
                  style={{
                    backgroundColor:
                      pageNumber - 1 === currentBoardPage ? "black" : "inherit",
                    color:
                      pageNumber - 1 === currentBoardPage ? "#eaeaea" : "black",
                  }}
                  onClick={() => changeCurrentPage(pageNumber - 1)}
                >
                  {pageNumber}
                </li>
              ))}
              {boardPage.totalPages > 5 && (
                <span style={{ display: "flex", flexDirection: "row" }}>
                  ...
                  <li
                    className={styles.detail__page_btn}
                    onClick={() => changeCurrentPage(boardPage.totalPages - 1)}
                  >
                    {boardPage.totalPages}
                  </li>
                </span>
              )}
              <li
                className={styles.detail__page_btn}
                style={{
                  color:
                    currentBoardPage + 1 === boardPage.totalPages
                      ? "#c0c0c0"
                      : "black",
                }}
                onClick={() => changeCurrentPage(currentBoardPage + 1)}
              >{`>`}</li>
              <li
                className={styles.detail__page_btn}
                style={{
                  color:
                    currentBoardPage + 1 === boardPage.totalPages
                      ? "#c0c0c0"
                      : "black",
                }}
                onClick={() => changeCurrentPage(boardPage.totalPages - 1)}
              >{`> >`}</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetailCategory;
