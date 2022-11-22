import { Link } from "react-router-dom";
import styles from "./Section.module.css";
function Section(props) {
  return (
    <div
      className={styles.section__container}
      style={{ width: props.styles ? props.styles.width : "" }}
    >
      <fieldset>
        <legend className={styles.title}>
          {props.title ? props.title : "메뉴"}
        </legend>
        <Link
          to={props.more ? props.more : ""}
          state={props.state ? props.state : {}}
        >
          <div className={styles.sction__button__container}>
            <span className={styles.more}>More</span>
          </div>
        </Link>
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
