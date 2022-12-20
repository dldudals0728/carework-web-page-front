import { useContext, useState } from "react";
import styles from "./Account.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IP_ADDRESS } from "../temp/IPAddress";
import DaumPostcode from "react-daum-postcode";
import EducationContext from "../components/EducationContext";

function Account() {
  const params = useParams();
  const edu = params.education;
  const navigate = useNavigate();
  const { pageState, setPageState } = useContext(EducationContext);
  const IP = IP_ADDRESS;
  const [isSend, setIsSend] = useState(false);
  const [name, setName] = useState("");
  const [frontRRN, setFrontRRN] = useState("");
  const [backRRN, setBackRRN] = useState("");
  const [RRN, setRRN] = useState("");
  const [id, setId] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [confirmedId, setConfirmedId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [addressCode, setAddressCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [classTime, setClassTime] = useState("");

  const [openPostcode, setOpenPostcode] = useState(false);

  const [inputVlidation, setInputVlidation] = useState({
    name: false,
    RRN: false,
    id: false,
    password: false,
    checkPwd: false,
    phone: false,
    address: false,
  });

  const onChangeRRN = (e) => {
    if (e.target.name === "frontRRN") {
      setFrontRRN(e.target.value);
      setRRN(e.target.value + "-" + backRRN);
    } else {
      setBackRRN(e.target.value);
      setRRN(frontRRN + "-" + e.target.value);
    }
  };

  const checkDuplicated = async () => {
    if (id.length > 16 || id.length < 4) {
      setIsDuplicated(true);
      setConfirmedId(id);
      return;
    }
    const res = await axios.get(IP + `/account/idcheck?id=${id}`);
    if (res.data.status === 200) {
      setIsDuplicated(false);
      setConfirmedId(id);
    } else {
      setIsDuplicated(true);
      setConfirmedId(id);
    }
  };

  const checkInput = () => {
    const prevInputValid = { ...inputVlidation };
    if (name !== "") {
      prevInputValid.name = true;
    } else {
      prevInputValid.name = false;
    }

    if (RRN !== "" && frontRRN.length === 6 && backRRN.length === 7) {
      prevInputValid.RRN = true;
    } else {
      prevInputValid.RRN = false;
    }

    if (!isDuplicated && id === confirmedId) {
      prevInputValid.id = true;
    } else {
      prevInputValid.id = false;
    }

    if (password.length >= 4 && password.length <= 16) {
      prevInputValid.password = true;
    } else {
      prevInputValid.password = false;
    }

    if (checkPwd === password) {
      prevInputValid.checkPwd = true;
    } else {
      prevInputValid.checkPwd = false;
    }

    if (phone.length === 11) {
      prevInputValid.phone = true;
    } else {
      prevInputValid.phone = false;
    }

    if (address !== "") {
      prevInputValid.address = true;
    } else {
      prevInputValid.address = false;
    }

    setInputVlidation(prevInputValid);
    return prevInputValid;
  };

  const selectAddress = (data) => {
    setOpenPostcode(false);
    setAddress(data.address);
    setAddressCode(data.zonecode);
    setFullAddress(data.address);
    setDetailAddress("");
  };

  const addUser = async (e) => {
    // e.preventDefault();
    setIsSend(true);
    e.preventDefault();
    let isCorrect = true;
    const checkValidation = checkInput();
    Object.values(checkValidation).forEach((value) => {
      if (value === false) {
        isCorrect = false;
      }
    });
    if (!isCorrect) {
      return;
    }
    const res = await axios
      .post(IP + "/account/addUser", {
        name: name,
        userRRN: RRN,
        phone: phone,
        id: id,
        password: password,
        address: fullAddress,
        classNumber: classNumber,
        classTime: classTime,
      })
      .then((response) => {
        if (response.data.status === 500) {
        } else {
          navigate(`/${edu}`);
        }
      })
      .catch((error) => {});
  };
  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
        role={pageState.role}
      />
      <div className={styles.account__container}>
        <span>회원가입</span>
        <div className={styles.account__form}>
          <form
            action="http://172.30.1.35:8080/account/login"
            method="post"
            onSubmit={addUser}
          >
            <label>
              <div className={styles.account__text}>* 이름</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.name ? "block" : "none",
                }}
              >
                * 이름은 필수 입력 값입니다.
              </div>
              <input
                className={styles.account__input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="이름"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 주민등록번호</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.RRN ? "block" : "none",
                }}
              >
                * 주민등록번호 형식이 맞지 않습니다.(6자리 앞자리, 7자리 뒷자리)
              </div>
              <div>
                <input
                  className={styles.account__input}
                  value={frontRRN}
                  onChange={onChangeRRN}
                  type="text"
                  name="frontRRN"
                  placeholder=""
                />{" "}
                -{" "}
                <input
                  className={styles.account__input}
                  value={backRRN}
                  onChange={onChangeRRN}
                  type="password"
                  name="backRRN"
                  placeholder=""
                />
              </div>
            </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <label>
                  <div className={styles.account__text}>* 아이디</div>
                  <div
                    className={styles.account__validate}
                    style={{
                      display: isSend && !inputVlidation.id ? "block" : "none",
                    }}
                  >
                    * 아이디 중복 확인을 진행해주세요.
                  </div>
                  <input
                    className={styles.account__input}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    type="text"
                    name="id"
                    placeholder="ID"
                    style={{ margin: 0 }}
                  />
                </label>
                <button
                  className={styles.account__idcheck}
                  type="button"
                  onClick={checkDuplicated}
                >
                  중복확인
                </button>
              </div>
              <div style={{ display: confirmedId !== "" ? "block" : "none" }}>
                <span
                  className={styles.account__id__cantuse}
                  style={{
                    display: isDuplicated ? "inline" : "none",
                    position: "relative",
                    top: -20,
                  }}
                >
                  중복된 아이디거나, 사용할 수 없는 아이디 입니다.(4 ~ 16자)
                </span>
                <span
                  className={styles.account__id__canuse}
                  style={{
                    display: isDuplicated ? "none" : "inline",
                    position: "relative",
                    top: -20,
                  }}
                >
                  사용 가능한 아이디 입니다.
                </span>
              </div>
            </div>
            <label>
              <div className={styles.account__text}>* 비밀번호</div>
              <div
                className={styles.account__validate}
                style={{
                  display:
                    isSend && !inputVlidation.password ? "block" : "none",
                }}
              >
                * 비밀번호는 6자 이상, 16자 이하 입니다.
              </div>
              <input
                className={styles.account__input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="비밀번호"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 비밀번호 확인</div>
              <div
                className={styles.account__validate}
                style={{
                  display:
                    isSend && !inputVlidation.checkPwd ? "block" : "none",
                }}
              >
                * 비밀번호가 일치하지 않습니다.
              </div>
              <input
                className={styles.account__input}
                value={checkPwd}
                onChange={(e) => setCheckPwd(e.target.value)}
                type="password"
                name="checkPwd"
                placeholder="비밀번호 확인"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 전화번호(- 제외)</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.phone ? "block" : "none",
                }}
              >
                * 전화번호 형식이 맞지 않습니다.(010-xxxx-xxxx)
              </div>
              <input
                className={styles.account__input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                name="phone"
                placeholder="phone"
              />
            </label>
            <label>
              <div className={styles.account__text}>* 주소</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.address ? "block" : "none",
                }}
              >
                * 주소를 입력해 주세요.
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div>
                  <input
                    className={styles.account__input}
                    value={addressCode}
                    placeholder="우편번호"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setOpenPostcode(!openPostcode)}
                    style={{ marginLeft: "12px" }}
                  >
                    {openPostcode ? "주소 검색 닫기" : "주소 검색 열기"}
                  </button>
                </div>
                <input
                  className={styles.account__input}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  placeholder="주소"
                  onClick={() => setOpenPostcode(!openPostcode)}
                />
                <input
                  className={styles.account__input}
                  value={detailAddress}
                  onChange={(e) => {
                    setDetailAddress(e.target.value);
                    if (e.target.value !== "") {
                      setFullAddress(address + " " + e.target.value);
                    } else {
                      setFullAddress(address);
                    }
                  }}
                  type="text"
                  name="detailAddress"
                  placeholder="상세주소 입력"
                />
                {openPostcode && (
                  <DaumPostcode
                    onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    style={{
                      position: "absolute",
                      left: "25vw",
                      bottom: "1vh",
                    }}
                  />
                )}
              </div>
            </label>
            <button type="submit">회원가입</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
