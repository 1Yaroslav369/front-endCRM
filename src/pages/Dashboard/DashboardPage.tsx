import { useAuthStore } from "../../store/authStore";

import styles from './Dashboard.module.scss';

const DashboardPage = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div>
      <h1 className={styles.titleHidden}>Dashboard</h1>

      <p>
        Welcome {user?.name}
      </p>

      <p>
        Role: {user?.role}
      </p>
    </div>
  );
};

export default DashboardPage;