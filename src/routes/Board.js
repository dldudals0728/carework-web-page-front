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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [menu, setMenu] = useState("");
  const [text, setText] = useState("본문을 선택하면 수정할 수 있습니다.");

  const [currentUser, setCurrentUser] = useState("");

  const [mode, setMode] = useState("");

  const [board, setBoard] = useState({});

  const [imgFile, setImgFile] = useState([]);
  const [imgBase64, setImgBase64] = useState([]);

  const getLoginSession = async () => {
    const url = IP + "/account/getUserSession";
    const res = await axios
      .get(url)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCurrentUser(response.data.login.name);
        } else {
        }
      })
      .catch((error) => {
        console.log("header get session error!");
        console.log(error);
      });
  };

  const uploadImgFile = async (boardIdx) => {
    if (imgFile.length === 0) {
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < imgFile.length; i++) {
      fd.append("file", imgFile[i]);
    }

    fd.append("mappingBoard", boardIdx);
    fd.append("comment", "comment text");

    const res = await axios
      .post(IP + "/img/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          setImgFile(null);
          setImgBase64([]);
          console.log("이미지가 업로드 되었습니다.");
        }
      })
      .catch((error) => {
        console.log("이미지 업로드에 실패하였습니다.");
        if (error.response) {
          console.log(
            "요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log(
            "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);
    setImgBase64([]);
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = () => {
        const base64 = reader.result;
        if (base64) {
          const base64Sub = base64.toString();
          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
        }
      };
    }
  };

  const updateBoard = async () => {
    let url = IP + "/board/updateBoard";
    url += `?boardIdx=${params.boardIdx}`;
    const res = await axios
      .post(url, {
        category,
        section: menu === "없음" ? "default" : menu,
        title,
        text,
        writer: currentUser,
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
    const res = await axios
      .post(IP + "/board/addBoard", {
        category,
        section: menu === "없음" ? "default" : menu,
        title,
        text,
        writer: currentUser,
        permission: "ANONYMOUS",
      })
      .then((response) => {
        if (response.data.status === 500) {
          console.log("something is wrong!");
        } else {
          console.log("board가 정상적으로 작성되었습니다.");
          navigate(`/${params.education}/category/${params.category}`);
        }
      })
      .catch((error) => {});
    console.log(res.data.board.id);
    uploadImgFile(JSON.stringify(res.data.board.id));
    alert("게시글이 등록되었습니다.");
  };

  const changeCategory = (event) => {
    setCategory(event.target.value);
    setMenuList(categoryMenu[event.target.value]);
    setMenu(categoryMenu[event.target.value][0]);
  };

  const setTitleText = async () => {
    if (mode === "insert") {
      return;
    } else if (mode === "update") {
      const res = await axios.get(
        IP + `/board/getBoardContent?boardIdx=${params.boardIdx}`
      );

      setTitle(res.data.board.title);
      setText(res.data.board.text);
    }
  };

  useEffect(() => {
    setTitleText();
  }, [mode]);

  useEffect(() => {
    getLoginSession();
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
      <Header />
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
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            // value={selectedFile}
            onChange={handleChangeFile}
          />
          <div>
            {imgBase64.map((img, idx) => {
              return (
                <img
                  key={idx}
                  src={img}
                  alt={"First slids"}
                  style={{ width: "200px", height: "150px" }}
                />
              );
            })}
          </div>
        </div>
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
