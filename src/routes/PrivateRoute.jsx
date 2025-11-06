import Loading from "@/Dashboard/page/Loading/Loading";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading></Loading>;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
