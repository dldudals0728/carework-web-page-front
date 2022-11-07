import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.account}>
        <ul className={`${styles.menu} ${styles.account__menu}`}>
          <li>회원가입</li>
          <li>로그인</li>
        </ul>
      </div>
      <div className={styles.logo}>
        <h1>awsome page</h1>
      </div>
      <div>
        <nav>
          <ul className={`${styles.menu} ${styles.main__menu}`}>
            <li>Home</li>
            <li>메뉴1</li>
            <li>메뉴2</li>
            <li>메뉴3</li>
            <li>커뮤니티</li>
            <li>전체메뉴</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
