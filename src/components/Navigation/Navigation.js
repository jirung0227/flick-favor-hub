// Navigation.js
import { FaHome, FaUser } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export const Navigation = ({ userObj }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to='/' className={styles.logoLink}>
          <MdLocalMovies className={styles.logoIcon} />
          Flick Favor Hub
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.gnb}>
          <li className={styles.sub_menu_toggle_btn}>
            <Link to='/' className={styles.menuLink}>
              <FaHome />
            </Link>
          </li>
          <li className={styles.sub_menu_toggle_btn}>
            <Link to='/profile' className={styles.menuLink}>
              <FaUser />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
