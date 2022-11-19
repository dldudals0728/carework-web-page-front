import styles from "./Section.module.css";
function Section() {
  return (
    <div className={styles.section__container}>
      <fieldset>
        <legend className={styles.title}>메뉴</legend>
        <div className={styles.sction__button__container}>
          <span className={styles.more}>More</span>
        </div>
        <ul className={styles.content}>
          <li>
            <span>항목1</span>
            <span>작성자</span>
          </li>
          <li>
            <span>항목2</span>
            <span>작성자</span>
          </li>
          <li>
            <span>항목3</span>
            <span>작성자</span>
          </li>
          <li>
            <span>항목4</span>
            <span>작성자</span>
          </li>
        </ul>
      </fieldset>
    </div>
  );
}

export default Section;
