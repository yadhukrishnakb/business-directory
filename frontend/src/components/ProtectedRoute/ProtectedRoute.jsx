import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const protectedRoute = ({ children }) => {
  const jwtToken = Cookies.get("jwt_token");
  if (!jwtToken) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default protectedRoute;
