import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IP_ADDRESS } from "../temp/IPAddress";

function DatabaseAccess() {
  const params = useParams();
  const location = useLocation();
  const IP = IP_ADDRESS;
  const { pageState, setPageState } = useContext(EducationContext);
  return (
    <div>
      <Header
        education={params.education}
        isLogin={pageState.isLogin}
        username={pageState.userName}
        role={pageState.role}
      />
      <div>
        <ul>
          <li>관리자 권한 부여</li>
          <li>------------------</li>
          <li>회원가입 승인</li>
          <li>수강생</li>
          <li>강사</li>
          <li>직원</li>
          <li>------------------</li>
          <li>학원 운영</li>
          <li>수강생 관리</li>
          <li>기수 관리</li>
          <li>강사 관리</li>
          <li>대체실습 관리</li>
          <li>대체실습 담당강사</li>
          <li>실습연계기관</li>
          <li>국시원 시험</li>
          <li>미입력 데이터</li>
          <li>To Do List</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default DatabaseAccess;
