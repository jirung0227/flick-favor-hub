// Auth.js
import { AuthForm } from "components/AuthForm/AuthForm";
import { authService, githubAuthProvider, googleProvider } from "fbase";
import { signInWithPopup } from "firebase/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdLocalMovies } from "react-icons/md";
import styles from "./Auth.module.css"; // CSS Modules 파일 import

export const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = googleProvider;
    } else {
      provider = githubAuthProvider;
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdLocalMovies />
        Flick Favor Hub
      </header>
      <main className={styles.main}>
        <AuthForm />
        <div className={styles.social_login_box}>
          <p className={styles.social_login_tit}>소셜 계정 로그인</p>
          <div className={styles.social_login}>
            <button
              name='google'
              className={`${styles.button} ${styles.login_google}`}
              onClick={onSocialClick}
            >
              <FcGoogle className={styles.icon} />
            </button>
            <button
              name='github'
              className={`${styles.button} ${styles.login_github}`}
              onClick={onSocialClick}
            >
              <FaGithub className={styles.icon} color='white' />
            </button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>&copy;FLICKFAVORHUB Corp.</footer>
    </div>
  );
};
