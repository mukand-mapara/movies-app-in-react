import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const activeProfile = useSelector(
    (state) => state.profile.activeProfile
  );

  if (!activeProfile) {
    return <Navigate to="/profiles" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
