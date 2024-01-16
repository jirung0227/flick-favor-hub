// AuthForm.js
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import styles from "./AuthForm.module.css";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          name='email'
          type='email'
          placeholder='이메일'
          value={email}
          onChange={onChange}
          required
        />
        <input
          className={styles.input}
          name='password'
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={onChange}
          required
        />
        <input
          className={styles.submit}
          type='submit'
          value={newAccount ? "회원가입" : "로그인"}
        />
        {error && <div>{error}</div>}
      </form>
      <div className={styles.toggle} onClick={toggleAccount}>
        {newAccount ? "로그인하기" : "회원가입하기"}
      </div>
    </>
  );
};
