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
    const res = await axios.get(IP + `/account/idCheck?id=${id}`);
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
      <Header />
      <div className={styles.account__container}>
        <span>????????????</span>
        <div className={styles.account__form}>
          <form
            action="http://172.30.1.35:8080/account/login"
            method="post"
            onSubmit={addUser}
          >
            <label>
              <div className={styles.account__text}>* ??????</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.name ? "block" : "none",
                }}
              >
                * ????????? ?????? ?????? ????????????.
              </div>
              <input
                className={styles.account__input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="??????"
              />
            </label>
            <label>
              <div className={styles.account__text}>* ??????????????????</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.RRN ? "block" : "none",
                }}
              >
                * ?????????????????? ????????? ?????? ????????????.(6?????? ?????????, 7?????? ?????????)
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
                  <div className={styles.account__text}>* ?????????</div>
                  <div
                    className={styles.account__validate}
                    style={{
                      display: isSend && !inputVlidation.id ? "block" : "none",
                    }}
                  >
                    * ????????? ?????? ????????? ??????????????????.
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
                  ????????????
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
                  ????????? ???????????????, ????????? ??? ?????? ????????? ?????????.(4 ~ 16???)
                </span>
                <span
                  className={styles.account__id__canuse}
                  style={{
                    display: isDuplicated ? "none" : "inline",
                    position: "relative",
                    top: -20,
                  }}
                >
                  ?????? ????????? ????????? ?????????.
                </span>
              </div>
            </div>
            <label>
              <div className={styles.account__text}>* ????????????</div>
              <div
                className={styles.account__validate}
                style={{
                  display:
                    isSend && !inputVlidation.password ? "block" : "none",
                }}
              >
                * ??????????????? 6??? ??????, 16??? ?????? ?????????.
              </div>
              <input
                className={styles.account__input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="????????????"
              />
            </label>
            <label>
              <div className={styles.account__text}>* ???????????? ??????</div>
              <div
                className={styles.account__validate}
                style={{
                  display:
                    isSend && !inputVlidation.checkPwd ? "block" : "none",
                }}
              >
                * ??????????????? ???????????? ????????????.
              </div>
              <input
                className={styles.account__input}
                value={checkPwd}
                onChange={(e) => setCheckPwd(e.target.value)}
                type="password"
                name="checkPwd"
                placeholder="???????????? ??????"
              />
            </label>
            <label>
              <div className={styles.account__text}>* ????????????(- ??????)</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.phone ? "block" : "none",
                }}
              >
                * ???????????? ????????? ?????? ????????????.(010-xxxx-xxxx)
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
              <div className={styles.account__text}>* ??????</div>
              <div
                className={styles.account__validate}
                style={{
                  display: isSend && !inputVlidation.address ? "block" : "none",
                }}
              >
                * ????????? ????????? ?????????.
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
                    placeholder="????????????"
                    disabled
                  />
                  <button
                    type="button"
                    onClick={() => setOpenPostcode(!openPostcode)}
                    style={{ marginLeft: "12px" }}
                  >
                    {openPostcode ? "?????? ?????? ??????" : "?????? ?????? ??????"}
                  </button>
                </div>
                <input
                  className={styles.account__input}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  placeholder="??????"
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
                  placeholder="???????????? ??????"
                />
                {openPostcode && (
                  <DaumPostcode
                    onComplete={selectAddress} // ?????? ????????? ?????? ???????????? ?????????
                    autoClose={false} // ?????? ????????? ?????? ???????????? DOM??? ???????????? ?????? ?????? ??????
                    style={{
                      position: "absolute",
                      left: "25vw",
                      bottom: "1vh",
                    }}
                  />
                )}
              </div>
            </label>
            <button type="submit">????????????</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
