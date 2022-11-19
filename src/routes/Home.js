import Footer from "../components/Footer";
import Header from "../components/Header";
import Section from "../components/Section";
import styles from "./Home.module.css";

function Home() {
  return (
    <div>
      <header className={styles.header__wrap}>
        <Header />
      </header>

      <section className={styles.home__body}>
        <img className={styles.poster} src="./nynoa_poster.jpg" alt="poster" />
      </section>
      <section className={styles.section__wrap}>
        <Section />
        <Section />
      </section>
      <section className={styles.section__wrap}>
        <Section />
        <Section />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
