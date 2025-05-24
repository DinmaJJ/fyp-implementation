import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../store/useAuthStore";

const ProtectedRoute = () => {
  const isAuth = isAuthenticated();

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
