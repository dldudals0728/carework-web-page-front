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
  const { pageState, setPageState } = useContext(EducationContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [menu, setMenu] = useState("");
  const [text, setText] = useState("본문을 선택하면 수정할 수 있습니다.");

  const [mode, setMode] = useState("");

  const [board, setBoard] = useState({});

  console.log("params:", params);
  console.log("location:", location);

  const updateBoard = async () => {
    console.log("updateBoard is called");
    let url = IP + "/board/updateBoard";
    url += `?boardIdx=${params.boardIdx}`;
    const res = await axios
      .post(url, {
        category,
        section: menu === "없음" ? "default" : menu,
        title,
        text,
        writer: pageState.userName,
        permission: "ANONYMOUS",
      })
      .then((response) => {
        if (response.data.status === 500) {
          console.log("something is wrong!");
        } else {
          navigate(`/${params.education}/category/${params.category}`);
        }
      })
      .catch((error) => {});
    alert("수정이 완료되었습니다.");
  };

  const writeBoard = async () => {
    console.log("writeBoard is called");
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
        if (response.data.status === 500) {
          console.log("something is wrong!");
        } else {
          navigate(`/${params.education}/category/${params.category}`);
        }
      })
      .catch((error) => {});
    alert("게시글이 등록되었습니다.");
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setMenuList(categoryMenu[event.target.value]);
    setMenu(categoryMenu[event.target.value][0]);
  };

  const setTitleText = async () => {
    console.log("mode:", mode);
    if (mode === "insert") {
      console.log("mode is insert. not working.");
      return;
    } else if (mode === "update") {
      console.log("mode is update. set title and text.");
      const res = await axios.get(
        IP + `/board/getBoardContent?boardIdx=${params.boardIdx}`
      );

      setTitle(res.data.board.title);
      setText(res.data.board.text);
    }
  };

  useEffect(() => {
    // console.log("mode is changed!");
    setTitleText();
  }, [mode]);

  useEffect(() => {
    setCategory(params.category);
    setMenuList(categoryMenu[params.category]);
    setMode(params.mode);

    if (params.mode === "update") {
      setTitleText();
    }

    if (location.state && location.state.menu !== "전체") {
      setMenu(location.state.menu);
    } else {
      setMenu(categoryMenu[params.category][0]);
    }
    // location.state
    //   ? setMenu(location.state.menu)
    //   : setMenu(categoryMenu[params.category][0]);
  }, []);

  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
        role={pageState.role}
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
            console.log(editor.getData());
            editor.setData(text);
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
            if (mode === "update") {
              editor.setData(text);
            } else {
              editor.setData("");
              setText("");
            }
            // console.log("on Focus!");
            // console.log("Focus.", editor);
          }}
        />
        <div className="board__btn__container">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              if (mode === "insert") {
                writeBoard();
              } else if (mode === "update") {
                updateBoard();
              }
            }}
          >
            {mode === "insert" ? "게시하기" : "수정하기"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Board;
