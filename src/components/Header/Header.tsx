import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );


  const handleLogout = () => {
    logout();

    navigate("/");
  };


  return (
    <header className={styles.header}>

      <h1 className={styles.title}>
        Dashboard
      </h1>


      <div className={styles.userBlock}>

        <div className={styles.userInfo}>
          <span className={styles.name}>
            {user?.name}
          </span>

          <span className={styles.role}>
            {user?.role}
          </span>
        </div>


        <button
          className={styles.logout}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Header;