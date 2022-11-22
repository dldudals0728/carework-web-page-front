import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./AccountType.module.css";

function AccountType() {
  const params = useParams();
  const edu = params.education;
  return (
    <div>
      <Header education={params.education} />
      <div className={styles.accountType__container}>
        <div>회원가입</div>
        <div className={styles.accountType__btn__container}>
          <Link>
            <div className={styles.accountType__btn}>
              신규 기관
              <div className={styles.accountType__btn__description}>
                홈페이지가 등록되지 않은 기관
              </div>
            </div>
          </Link>
          <Link>
            <div className={styles.accountType__btn}>
              기관 관리자
              <div className={styles.accountType__btn__description}>
                홈페이지가 등록된 기관의 간부
              </div>
            </div>
          </Link>
          <Link to={`/${edu}/account/student`}>
            <div className={styles.accountType__btn}>
              수강생
              <div className={styles.accountType__btn__description}>
                홈페이지가 등록된 기관의 수강생
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountType;
