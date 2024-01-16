// Profile.js
import { authService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FaSave, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

export const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogoutClick = () => {
    signOut(authService);
    navigate("/");
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={`profileInfo ${styles.profileInfo}`}>
        프로필 이름: {userObj.displayName}
      </div>
      <form onSubmit={onSubmit} className={`formGroup ${styles.formGroup}`}>
        <input
          onChange={onChange}
          type='text'
          className={`form-control ${styles.formControl}`}
          placeholder='Display name'
          value={newDisplayName}
        />
        <div className={`btnContainer ${styles.btnContainer}`}>
          <button
            type='submit'
            className={`btn ${styles.btn} ${styles.btnPrimary}`}
          >
            <FaSave className={styles.icon} />
          </button>
        </div>
      </form>
      <div className={`btnContainer ${styles.btnContainer}`}>
        <button
          onClick={onLogoutClick}
          className={`btn ${styles.btn} ${styles.btnDanger}`}
        >
          <FaSignOutAlt className={styles.icon} /> 로그아웃
        </button>
      </div>
    </div>
  );
};
