import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EducationContext from "../components/EducationContext";
import styles from "./Default.module.css";

function Default() {
  return (
    <div className={styles.default__container}>
      <div className={styles.default__title}>교육원 선택</div>
      <div className={styles.default__grid}>
        <Link to={`/nynoa`}>
          <div className={styles.default__btn}>
            <img
              src={`${process.env.PUBLIC_URL}/nynoa.jpg`}
              alt="남양노아요양보호사교육원"
              className={styles.default__img}
            />
          </div>
        </Link>
        <div className={styles.default__btn}>None</div>
        <div className={styles.default__btn}>None</div>
        <div className={styles.default__btn}>None</div>
        <div className={styles.default__btn}>None</div>
        <div className={styles.default__btn}>None</div>
      </div>
    </div>
  );
}

export default Default;
