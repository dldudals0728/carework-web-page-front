import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Section from "../components/Section";
import styles from "./Home.module.css";

function Home() {
  const params = useParams();
  const { pageState, setPageState } = useContext(EducationContext);
  const changeCurrentPage = (pageName) => {
    const prevPageState = { ...pageState };
    prevPageState.page = pageName;
    console.log(prevPageState);
    setPageState(prevPageState);
  };
  useEffect(() => {
    if (pageState.page === undefined) {
      changeCurrentPage(params.education);
    }
  }, []);

  if (params.education !== "nynoa") {
    return <div></div>;
  }
  return (
    <div>
      <header className={styles.header__wrap}>
        <Header education={params.education} />
      </header>

      <section className={styles.home__main}>
        <section className={styles.home__body}>
          <div className={styles.home__body__left}>
            <img
              className={styles.poster}
              src="./nynoa_poster.jpg"
              alt="poster"
            />
          </div>
          <div className={styles.home__body__right}>
            <Section
              styles={{ width: "80%" }}
              title="주간반 공지"
              more={`/${params.education}/category/classinfo`}
              state={{ section: "주간" }}
            />
            <Section
              styles={{ width: "80%" }}
              title="야간반 공지"
              more={`/${params.education}/category/classinfo`}
              state={{ section: "야간" }}
            />
          </div>
        </section>
        <hr />
        <section className={styles.section__wrap}>
          <Section />
          <Section />
        </section>
        <section className={styles.section__wrap}>
          <Section />
          <Section />
        </section>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
