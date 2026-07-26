import { useAuthStore } from "../../store/authStore";

const DashboardPage = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div>
      <h1>Dashboard</h1>

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