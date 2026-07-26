import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!user) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;