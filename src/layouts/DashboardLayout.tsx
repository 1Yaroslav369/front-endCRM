import { Outlet } from "react-router-dom";

//components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

//styles
import styles from "./DashboardLayout.module.scss";

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Header />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default DashboardLayout;