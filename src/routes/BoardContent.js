import axios from "axios";
import styles from "./BoardContent.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IP_ADDRESS } from "../temp/IPAddress";
import { ROLE } from "../constant/Role";

function BoardContent() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const IP = IP_ADDRESS;
  const { pageState, setPageState } = useContext(EducationContext);

  console.log(pageState);

  const [board, setBoard] = useState({});
  const [publishedDate, setPublishedDate] = useState(new Date());

  const getBoardContent = async () => {
    const res = await axios.get(
      IP + `/board/getBoardContent?boardIdx=${params.board_idx}`
    );
    if (res.data.status === 200) {
      setBoard(res.data.board);
      setPublishedDate(new Date(res.data.board.publishedDate));
    }
  };

  const addViewCnt = async () => {
    console.log(board);
  };

  const deleteBoardContent = async () => {
    const res = await axios
      .post(IP + `/board/deleteBoard?boardIdx=${params.board_idx}`)
      .then((response) => {
        if (response.data.status === 500) {
          console.log("something is wrong!");
        } else {
          navigate(`/${params.education}/category/${params.category}`);
        }
      })
      .catch((error) => {});
    alert("삭제가 완료되었습니다.");
  };

  useEffect(() => {
    addViewCnt();
  }, [board]);

  useEffect(() => {
    getBoardContent();
  }, []);

  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
        role={pageState.role}
      />
      <div className={styles.board_content__container}>
        <h1 className={styles.board_content__title}>{board.title}</h1>
        <div className={styles.board_content__info}>
          <div>
            <div>작성자: {board.writer}</div>
            <div>
              작성일:{" "}
              {`${publishedDate.getFullYear()}-${
                publishedDate.getMonth() + 1
              }-${publishedDate.getDate()} ${publishedDate.getHours()}:${publishedDate.getMinutes()}`}
            </div>
          </div>
          <div>조회수: 0</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: board.text }}></div>
        <div className="board__btn__container">
          {pageState.isLogin && ROLE[pageState.role] >= 5 && (
            <div>
              <button
                style={{
                  marginRight: "1vw",
                  backgroundColor: "#f7bdbd",
                  color: "black",
                  borderColor: "red",
                }}
                onClick={() => deleteBoardContent()}
              >
                삭제
              </button>
              <Link
                to={`/${params.education}/category/${params.category}/update/${params.board_idx}`}
                state={
                  pageState.isLogin
                    ? {
                        boardIdx: params.board_idx,
                        menu: board.section,
                        mode: "update",
                      }
                    : null
                }
              >
                <button type="button">수정</button>
              </Link>
            </div>
          )}
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
