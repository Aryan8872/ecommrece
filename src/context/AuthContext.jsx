import { Navigate, Outlet } from "react-router-dom";
import { useFirst } from "./FirstContext";

const ProtectedRouteUser = () => {
  const { isAuthenticated } = useFirst();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteUser;