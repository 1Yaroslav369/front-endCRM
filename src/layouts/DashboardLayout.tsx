import { Outlet } from "react-router-dom";

//components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default DashboardLayout;