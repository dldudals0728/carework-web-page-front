import "./Board.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { IP_ADDRESS } from "../temp/IPAddress";

const categoryMenu = {
  classinfo: ["주간", "야간"],
  exam: ["38회", "39회", "40회", "41회"],
  job: ["없음"],
  qna: ["없음"],
  notice: ["없음"],
};

function Board(props) {
  const IP = IP_ADDRESS;
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const { pageState, setPageState } = useContext(EducationContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [menu, setMenu] = useState("");
  const [text, setText] = useState("");

  const writeBoard = async () => {
    console.log("제목");
    console.log(title);
    console.log("내용");
    console.log(text);

    console.log(`category: ${category}`);
    console.log(`menu: ${menu}`);

    console.log("글쓴이");
    console.log(pageState.userName);

    console.log(Date.now());
    console.log(new Date());
    console.log(params);

    const res = await axios
      .post(IP + "/board/addBoard", {
        category,
        section: menu === "없음" ? "default" : menu,
        title,
        text,
        writer: pageState.userName,
        permission: "ANONYMOUS",
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 490) {
          console.log("게시판 오류입니다.");
          console.log(response.data);
        } else {
          console.log(`게시글이 등록되었습니다.`);
          navigate(`/${params.education}/category/${params.category}`);
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setMenuList(categoryMenu[event.target.value]);
    setMenu(categoryMenu[event.target.value][0]);
  };

  useEffect(() => {
    setCategory(params.category);
    setMenuList(categoryMenu[params.category]);
    setMenu(categoryMenu[params.category][0]);
  }, []);

  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
      />
      <div className="board__board">
        <div className="board__header">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="board__title"
          />
          <div className="board__select">
            <select
              className="board__category"
              onChange={changeCategory}
              value={category}
            >
              <option value="classinfo">개강 정보</option>
              <option value="exam">시험 공지</option>
              <option value="job">취업 게시판</option>
              <option value="qna">Q&A</option>
              <option value="notice">공지사항</option>
            </select>
            <select
              className="board__menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            >
              {menuList.map((menu, idx) => (
                <option key={idx} value={menu}>
                  {menu}
                </option>
              ))}
            </select>
          </div>
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "글을 입력하세요",
          }}
          data=""
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            // console.log("on Change!");
            const data = editor.getData();
            setText(data);
            // console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            // focus out
            // console.log("on Blur!");
            // console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            // console.log("on Focus!");
            // console.log("Focus.", editor);
          }}
        />
        <div className="board__btn__container">
          <button type="button">취소</button>
          <button type="button" onClick={writeBoard}>
            게시하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Board;
