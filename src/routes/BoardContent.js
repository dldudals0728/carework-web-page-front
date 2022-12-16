import axios from "axios";
import styles from "./BoardContent.module.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IP_ADDRESS } from "../temp/IPAddress";

function BoardContent() {
  const tempContent = ["1번글", "2번글", "3번글", "4번글"];
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const IP = IP_ADDRESS;
  const { pageState, setPageState } = useContext(EducationContext);

  console.log(pageState);

  const [board, setBoard] = useState({});
  const [publishedDate, setPublishedDate] = useState(new Date());

  const getBoardContent = async () => {
    console.log(params);
    const res = await axios.get(
      IP + `/board/getBoardContent?boardIdx=${params.board_idx}`
    );
    console.log(res);
    if (res.data.status === 200) {
      setBoard(res.data.board);
      setPublishedDate(new Date(res.data.board.publishedDate));
    }
  };

  useEffect(() => {
    getBoardContent();
  }, []);

  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
      />
      <div className={styles.board_content__container}>
        <h1 className={styles.board_content__title}>{board.title}</h1>
        <div className={styles.board_content__info}>
          <div>작성자: {board.writer}</div>
          <div>
            작성일:{" "}
            {`${publishedDate.getFullYear()}-${
              publishedDate.getMonth() + 1
            }-${publishedDate.getDate()} ${publishedDate.getHours()}:${publishedDate.getMinutes()}`}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: board.text }}></div>
        <div className="board__btn__container">
          {pageState.isLogin && <button type="button">수정</button>}
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            돌아가기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BoardContent;
